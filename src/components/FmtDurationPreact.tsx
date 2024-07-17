import { Component, createRef, Fragment, type Attributes, type ComponentChild, type ComponentChildren, type Ref } from "preact";
import { useEffect, useState } from "preact/hooks";
import "preact/debug";
import "preact/devtools";

interface Props {
  start: Date;
  end?: Date;
}

const msPerSec = 1000;
const secPerMin = 60;
const minPerHour = 60;
const hourPerDay = 24;

const formatTime = (millis: number): string => {
  let val = millis;
  let unit: string;
  if (millis < msPerSec) {
    unit = `Millisekunde${val !== 1 ? "n" : ""}`;
  } else if (millis < msPerSec * secPerMin) {
    val /= msPerSec;
    unit = `Sekunde${val !== 1 ? "n" : ""}`;
  } else if (millis < msPerSec * secPerMin * minPerHour) {
    val /= msPerSec * secPerMin;
    unit = `Minute${val !== 1 ? "n" : ""}`;
  } else if (millis < msPerSec * secPerMin * minPerHour * hourPerDay) {
    val /= msPerSec * secPerMin * minPerHour;
    unit = `Stunde${val !== 1 ? "n" : ""}`;
  } else {
    val /= msPerSec * secPerMin * minPerHour * hourPerDay;
    unit = `Tag${val !== 1 ? "e" : ""}`;
  }
  return `${Math.floor(val)} ${unit}`;
};

const FmtDurationPreact = ({ start, end }: Props) => {
  const [actualEnd, setActualEnd] = useState<Date>(end || new Date());
  useEffect(() => {
    if (!end) {
      // dynamically update duration on client render
      const interval = setInterval(() => setActualEnd(new Date()), 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [end]);

  return <Fragment>{formatTime(actualEnd.getTime() - start.getTime())}</Fragment>;
};
export default FmtDurationPreact;
