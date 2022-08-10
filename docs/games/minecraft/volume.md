# Volume

This is the formula of how the volume of a sound is calculated in minecraft:

```js
function calcVolume(distance, vol = 1) {
  let max = 16;
  if (vol >= 1) {
    max *= vol;
    vol = 1;
  }

  return (vol * (max - distance)) / max;
}
```

---

[Reference](https://www.reddit.com/r/technicalminecraft/comments/44my2w/request_whats_the_formula_for_calculating_sound/)
