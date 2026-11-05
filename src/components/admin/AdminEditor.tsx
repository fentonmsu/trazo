import { useEffect, useMemo, useRef, useState } from 'react';
import type { CharacterTemplate, LanguageId, Stroke } from '../../types/character';
import { getCharactersForLanguage } from '../../data';
import { LANGUAGES, LANGUAGE_ORDER } from '../../data/languages';
import { ScriptGlyph } from '../ScriptGlyph';
import { DrawingCanvas } from '../DrawingCanvas';
import { api } from '../../api/client';
import type { OverrideMap } from '../../hooks/useStrokeOverrides';
import { simplifyStroke, smoothStroke } from '../../engine/strokeSmoothing';

const BOX_SIZE = 420;
const STROKE_COLORS = ['#e0380f', '#0d7de8', '#1a9850', '#9b59b6', '#e0a800'];
const SIMPLIFY_TOLERANCE = 2.5;

function cloneStrokes(strokes: Stroke[]): Stroke[] {
  return strokes.map((s) => s.map((p) => ({ x: p.x, y: p.y })));
}

interface AdminEditorProps {
  overrides: OverrideMap;
  onOverridesChanged: () => void;
  onClose: () => void;
  onLock: () => void;
}

export function AdminEditor({ overrides, onOverridesChanged, onClose, onLock }: AdminEditorProps) {
  const [language, setLanguage] = useState<LanguageId>('hebrewCursive');
  const characters = useMemo(() => getCharactersForLanguage(language), [language]);
  const [selectedId, setSelectedId] = useState<string | null>(characters[0]?.id ?? null);

  const target: CharacterTemplate | null = useMemo(
    () => characters.find((c) => c.id === selectedId) ?? characters[0] ?? null,
    [characters, selectedId],
  );

  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [activeStroke, setActiveStroke] = useState(0);
  const [hasOverride, setHasOverride] = useState(false);
  const [smoothOnSave, setSmoothOnSave] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string>('');
  const dragRef = useRef<{ stroke: number; point: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!target) return;
    const override = overrides[target.id];
    const source = override ?? target.strokes;
    // Shipped/override strokes are often already densely resampled
    // (30-50+ points) for smooth rendering - editing that directly would
    // mean dragging dozens of overlapping handles. Simplify down to a few
    // key points here; smoothStroke() re-expands them again on save.
    setStrokes(source.map((s) => simplifyStroke(s, SIMPLIFY_TOLERANCE)));
    setHasOverride(Boolean(override));
    setActiveStroke(0);
    setStatus('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.id]);

  const previewStrokes = useMemo(
    () => (smoothOnSave ? strokes.map((s) => (s.length >= 3 ? smoothStroke(s) : s)) : strokes),
    [strokes, smoothOnSave],
  );

  function toGridPoint(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return { x: 50, y: 50 };
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
  }

  function handleBackgroundClick(e: React.MouseEvent<SVGRectElement>) {
    if (dragRef.current) return;
    const p = toGridPoint(e.clientX, e.clientY);
    setStrokes((prev) => {
      const next = cloneStrokes(prev);
      if (!next[activeStroke]) next[activeStroke] = [];
      next[activeStroke] = [...next[activeStroke], p];
      return next;
    });
    setStatus('');
  }

  function handlePointDown(strokeIdx: number, pointIdx: number, e: React.PointerEvent) {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    dragRef.current = { stroke: strokeIdx, point: pointIdx };
    setActiveStroke(strokeIdx);
  }

  function handlePointMove(e: React.PointerEvent) {
    const drag = dragRef.current;
    if (!drag) return;
    const p = toGridPoint(e.clientX, e.clientY);
    setStrokes((prev) => {
      const next = cloneStrokes(prev);
      next[drag.stroke][drag.point] = p;
      return next;
    });
  }

  function handlePointUp() {
    dragRef.current = null;
    setStatus('');
  }

  function handlePointDoubleClick(strokeIdx: number, pointIdx: number, e: React.MouseEvent) {
    e.stopPropagation();
    setStrokes((prev) => {
      const next = cloneStrokes(prev);
      next[strokeIdx] = next[strokeIdx].filter((_, i) => i !== pointIdx);
      return next.filter((s) => s.length > 0);
    });
  }

  function addStroke() {
    setStrokes((prev) => [...prev, []]);
    setActiveStroke(strokes.length);
  }

  function deleteActiveStroke() {
    setStrokes((prev) => prev.filter((_, i) => i !== activeStroke));
    setActiveStroke(0);
  }

  function undoLastPoint() {
    setStrokes((prev) => {
      const next = cloneStrokes(prev);
      if (next[activeStroke]?.length) next[activeStroke] = next[activeStroke].slice(0, -1);
      return next;
    });
  }

  async function handleSave() {
    if (!target) return;
    setSaving(true);
    try {
      await api.put(`/admin/overrides/${target.id}`, { strokes: previewStrokes });
      setHasOverride(true);
      setStatus('Guardado ✓');
      onOverridesChanged();
    } catch {
      setStatus('Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    if (!target) return;
    setSaving(true);
    try {
      await api.delete(`/admin/overrides/${target.id}`);
      setStrokes(target.strokes.map((s) => simplifyStroke(s, SIMPLIFY_TOLERANCE)));
      setHasOverride(false);
      setStatus('Restaurado al original');
      onOverridesChanged();
    } catch {
      setStatus('Error al restaurar');
    } finally {
      setSaving(false);
    }
  }

  if (!target) return null;

  return (
    <div className="admin-overlay">
      <div className="admin-panel">
        <div className="admin-header">
          <h2>Editor de trazos</h2>
          <div className="admin-header-actions">
            <button type="button" onClick={onLock}>Bloquear editor</button>
            <button type="button" onClick={onClose}>✕ Cerrar</button>
          </div>
        </div>

        <div className="admin-controls-row">
          <select value={language} onChange={(e) => setLanguage(e.target.value as LanguageId)}>
            {LANGUAGE_ORDER.map((id) => (
              <option key={id} value={id}>{LANGUAGES[id].name}</option>
            ))}
          </select>
          <div className="admin-char-list">
            {characters.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`admin-char-chip ${c.id === target.id ? 'active' : ''} ${overrides[c.id] ? 'overridden' : ''}`}
                onClick={() => setSelectedId(c.id)}
                title={c.romanization}
              >
                {c.char}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-main-row">
          <div className="admin-edit-box" style={{ width: BOX_SIZE, height: BOX_SIZE }}>
            <div className="admin-edit-glyph">
              <ScriptGlyph template={target} />
            </div>
            <svg
              ref={svgRef}
              viewBox="0 0 100 100"
              className="admin-edit-svg"
              onPointerMove={handlePointMove}
              onPointerUp={handlePointUp}
            >
              <rect x={0} y={0} width={100} height={100} fill="transparent" onClick={handleBackgroundClick} />
              {strokes.map((stroke, sIdx) => {
                const color = STROKE_COLORS[sIdx % STROKE_COLORS.length];
                const d = stroke.map((p, i) => (i === 0 ? 'M' : 'L') + p.x + ',' + p.y).join(' ');
                return (
                  <g key={sIdx} opacity={sIdx === activeStroke ? 1 : 0.45}>
                    <path d={d} stroke={color} strokeWidth={1.2} fill="none" />
                    {stroke.map((p, pIdx) => (
                      <g key={pIdx}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={2.2}
                          fill={color}
                          onPointerDown={(e) => handlePointDown(sIdx, pIdx, e)}
                          onDoubleClick={(e) => handlePointDoubleClick(sIdx, pIdx, e)}
                          style={{ cursor: 'grab' }}
                        />
                        <text x={p.x} y={p.y} fontSize={2.4} fill="#fff" textAnchor="middle" dominantBaseline="central" pointerEvents="none">
                          {pIdx + 1}
                        </text>
                      </g>
                    ))}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="admin-side-panel">
            <p className="admin-hint">
              Click en el lienzo: agrega un punto al trazo activo. Arrastrar: mueve un punto. Doble click: borra un punto.
            </p>
            <div className="admin-stroke-tabs">
              {strokes.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={i === activeStroke ? 'active' : ''}
                  style={{ borderColor: STROKE_COLORS[i % STROKE_COLORS.length] }}
                  onClick={() => setActiveStroke(i)}
                >
                  Trazo {i + 1}
                </button>
              ))}
            </div>
            <div className="admin-stroke-actions">
              <button type="button" onClick={addStroke}>+ Nuevo trazo</button>
              <button type="button" onClick={undoLastPoint} disabled={!strokes[activeStroke]?.length}>Deshacer punto</button>
              <button type="button" onClick={deleteActiveStroke} disabled={strokes.length <= 1}>Eliminar trazo</button>
            </div>

            <label className="admin-smooth-toggle">
              <input type="checkbox" checked={smoothOnSave} onChange={(e) => setSmoothOnSave(e.target.checked)} />
              Suavizar la curva al guardar
            </label>

            <div className="admin-preview-label">Vista previa (como se verá en la app):</div>
            <DrawingCanvas size={160} guideStrokes={previewStrokes} />

            <div className="admin-save-row">
              <button type="button" className="primary" onClick={handleSave} disabled={saving}>
                Guardar
              </button>
              <button type="button" onClick={handleReset} disabled={saving || !hasOverride}>
                Restaurar original
              </button>
            </div>
            {status && <p className="admin-status">{status}</p>}
            {hasOverride && <p className="admin-override-flag">Esta letra tiene una corrección guardada.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
