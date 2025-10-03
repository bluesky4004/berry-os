

export const DEFAULT_START_HOUR = 6;
export const DEFAULT_END_HOUR = 22;
export const PX_PER_MINUTE = 1; // 1px = 1 minute

export function toMinutes(hhmm: string, startHour = DEFAULT_START_HOUR) {
  const [h, m] = hhmm.split(":").map(Number);
  return (h - startHour) * 60 + m;
}

export function blockMetrics(start: string, end: string, startHour = DEFAULT_START_HOUR) {
  const top = toMinutes(start, startHour) * PX_PER_MINUTE;
  const height = (toMinutes(end, startHour) - toMinutes(start, startHour)) * PX_PER_MINUTE;
  return { top, height };
}

export function hourLabels(startHour = DEFAULT_START_HOUR, endHour = DEFAULT_END_HOUR) {
  return Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);
}


//parseHM(hhmm: string): { h: number; m: number }

  //What it does: Splits a "HH:MM" string into numbers {h, m}.

//Why: You can’t do math on "08:30" directly. You need 8 and 30.

//Example: parseHM("09:15") → { h: 9, m: 15 }.

export function parseHM(hhmm: string){
  const [hS, mS] = hhmm.split(':');
  const h = parseInt(hS);
  const m  = parseInt(mS);
  return {h,m};
}

export function toMinutesSince(startHour: number, hhmm: string){
  const {h, m} = parseHM(hhmm);
  return (h-startHour)*60 + m;
}

export function minutesBetween(a: string, b: string){
  const {h: hA, m: mA} = parseHM(a);
  const {h: hB, m: mB} = parseHM(b);
  const tA = (hA*60)+mA;
  const tB = (hB*60)+mB;

  return tB - tA;

 }

 export function durationBetween(a: string, b: string) {
  return Math.abs(minutesBetween(a, b));
}

export function toTotalMinutes(hhmm: string){
  const {h: hZ, m: mZ} = parseHM(hhmm);
  const minutes = (hZ*60) + mZ;
  return minutes;

}

export function fromTotalMinutes(total: number){
  const minsInDay = 24 * 60;
  const t = ((total % minsInDay) + minsInDay) % minsInDay; 
  const h = Math.floor(t / 60);
  const m = t % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  
}

export function snap(hhmm: string, stepMin: number){
  const t = toTotalMinutes(hhmm);
  const snapped = Math.round(t / stepMin) * stepMin;
  return fromTotalMinutes(snapped);

}

export function formatHM(minsFromStart: number, startHour: number){
  let minutes = (minsFromStart + startHour*60);
  return fromTotalMinutes(minutes);
}

export function addMinutes(hhmm: string, delta: number){
  let newMinutes = toTotalMinutes(hhmm) + delta;
  return fromTotalMinutes(newMinutes);

}

export function clampToDay(hhmm: string, startHour=0, endHour=24){
   const t = toTotalMinutes(hhmm);
  const min = startHour * 60;
  const max = endHour * 60;
  const clamped = Math.max(min, Math.min(t, max));
  return fromTotalMinutes(clamped);
}

export function isOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string){
  let aMin =toMinutes(aStart);
  let aMax = toMinutes(aEnd);
  let bMin = toMinutes(bStart);
  let bMax = toMinutes(bEnd);


  if (aMin > bMax || aMax < bMin){
    return false;
  }

  else return true;
}