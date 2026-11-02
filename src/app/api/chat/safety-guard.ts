
const awayPattern =
/(返工|上班|冇人|無人|没人|沒人|自己喺屋企|獨自在家|独自在家|出門|出门|home alone|left alone|unattended|unsupervised|while i(?:'m| am)? (?:at work|away)|leave for work)/i;

const toyPattern =
/(玩具|公仔|咬嘢|咬东西|解悶|解闷|toy|plush|chew|entertain|bored)/i;

export function isUnattendedPlayRequest(
text: string,
): boolean {
return awayPattern.test(text) && toyPattern.test(text);
}

export function getUnattendedSafetyReply(
text: string,
): string {
if (/(唔|喺|冇|啲|畀|返工|狗仔|有冇)/.test(text)) {
  return (
    '汪～飛飛都想幫狗仔解悶！🐾 ' +
    '不過我暫時冇核實過邊款玩具適合冇人睇住時使用，' +
    '所以唔會亂推薦留低畀佢自己玩。' +
    '等你喺屋企時，我可以幫你搵啲互動玩具呀！'
  );
}

if (/[\u3400-\u9FFF]/.test(text)) {
  return (
    '汪～飞飞也想帮狗狗解闷！🐾 ' +
    '不过我们暂时没有核实哪些玩具适合无人看管时使用。' +
    '主人在场时，我可以帮你挑选互动玩具！'
  );
}

return (
  "Woof! 🐾 I'd love to keep your pup entertained, " +
  "but I can't verify which toys are safe for unsupervised play. " +
  "I can help find toys for supervised playtime!"
);
}