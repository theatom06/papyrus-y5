"use client"
import { useEffect, useState } from "react"
import { Check, ChevronDown, Pin, Plus } from "lucide-react"

export type PinGroup = { id: string; name: string }
export const defaultGroups: PinGroup[] = [{ id: "study", name: "Study list" }, { id: "exam", name: "Exam week" }, { id: "review", name: "Review later" }]
const groupsKey = "papyrus-pin-groups"
const pinsKey = "papyrus-pins"
export type PinnedPaper = { id: string; groupId: string; pinnedAt: number }
export function getGroups(): PinGroup[] { if (typeof window === "undefined") return defaultGroups; try { return JSON.parse(localStorage.getItem(groupsKey) || "null") || defaultGroups } catch { return defaultGroups } }
export function getPins(): PinnedPaper[] { if (typeof window === "undefined") return []; try { return JSON.parse(localStorage.getItem(pinsKey) || "[]") } catch { return [] } }
function persist(groups: PinGroup[], pins: PinnedPaper[]) { localStorage.setItem(groupsKey, JSON.stringify(groups)); localStorage.setItem(pinsKey, JSON.stringify(pins)); window.dispatchEvent(new Event("papyrus-pins-change")) }
export function PinPaper({ paperId, compact = false }: { paperId: string; compact?: boolean }) {
  const [groups, setGroups] = useState<PinGroup[]>(defaultGroups); const [selected, setSelected] = useState("study"); const [open, setOpen] = useState(false); const [pinned, setPinned] = useState(false)
  useEffect(() => { const sync = () => { const nextGroups = getGroups(); setGroups(nextGroups); setPinned(getPins().some(p => p.id === paperId)); setSelected(getPins().find(p => p.id === paperId)?.groupId || nextGroups[0]?.id || "study") }; sync(); window.addEventListener("papyrus-pins-change", sync); return () => window.removeEventListener("papyrus-pins-change", sync) }, [paperId])
  function toggle() { const pins = getPins(); const next = pinned ? pins.filter(p => p.id !== paperId) : [...pins.filter(p => p.id !== paperId), { id: paperId, groupId: selected, pinnedAt: Date.now() }]; persist(getGroups(), next); setPinned(!pinned); setOpen(false) }
  function changeGroup(groupId: string) { setSelected(groupId); const pins = getPins(); persist(getGroups(), [...pins.filter(p => p.id !== paperId), { id: paperId, groupId, pinnedAt: Date.now() }]); setPinned(true); setOpen(false) }
  function addGroup() { const name = window.prompt("Name your pin group"); if (!name?.trim()) return; const next = [...groups, { id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + Date.now(), name: name.trim() }]; persist(next, getPins()); setGroups(next) }
  return <div className={compact ? "pin-control compact" : "pin-control"}><button className={pinned ? "pin-button pinned" : "pin-button"} onClick={toggle} aria-label={pinned ? "Unpin paper" : "Pin paper"}><Pin size={14} fill={pinned ? "currentColor" : "none"}/>{!compact && (pinned ? "Pinned" : "Pin paper")}</button><button className="pin-group-button" onClick={() => setOpen(!open)} aria-label="Choose pin group"><ChevronDown size={13}/></button>{open && <div className="pin-menu"><p>Pin to group</p>{groups.map(group => <button key={group.id} onClick={() => changeGroup(group.id)}><span>{group.name}</span>{selected === group.id && pinned && <Check size={13}/>}</button>)}<button className="new-group" onClick={addGroup}><Plus size={13}/> New group</button></div>}</div>
} 
export function savePinGroups(groups: PinGroup[]) { if (typeof window !== "undefined") persist(groups, getPins()) }
export function removePin(id: string) { if (typeof window !== "undefined") persist(getGroups(), getPins().filter(pin => pin.id !== id)) }
export function renameGroup(id: string, name: string) { if (typeof window !== "undefined") persist(getGroups().map(group => group.id === id ? { ...group, name } : group), getPins()) }
export function deleteGroup(id: string) { if (typeof window !== "undefined") persist(getGroups().filter(group => group.id !== id), getPins().filter(pin => pin.groupId !== id)) }
