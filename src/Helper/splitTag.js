import React from "react";

export function splitTag(arr) {
  return arr.map((tag, idx, arr) => <div key={idx}> {arr[idx + 1] == undefined ? tag : tag + " |"}</div>);
}
