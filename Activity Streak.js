// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: magic;
function createWidget(activityTitle, streakCount, activityMapByDate) {
  const widgetSize = 140;
  const halfSize = widgetSize / 2;

  let widget = new ListWidget();
  widget.backgroundColor = new Color("#111");

  // === TOP ROW ===
  let topRow = widget.addStack();
  topRow.layoutHorizontally();
  topRow.spacing = 0;

  // === TOP LEFT COLUMN ===
  let topLeft = topRow.addStack();
  topLeft.size = new Size(halfSize, halfSize);
  topLeft.cornerRadius = 8;
  topLeft.layoutVertically();
  topLeft.setPadding(8, 8, 8, 8);

  // First line: number + icon
  let topLeftRow1 = topLeft.addStack();
  topLeftRow1.layoutHorizontally();
  topLeftRow1.centerAlignContent();

  let numberText = topLeftRow1.addText(`${streakCount}`);
  numberText.textColor = Color.white();
  numberText.font = Font.boldSystemFont(24);

  topLeftRow1.addSpacer(4);

  let icon = topLeftRow1.addImage(SFSymbol.named("flame").image);
  icon.imageSize = new Size(20, 20);
  icon.tintColor = Color.white();

  // Second line: "week" text
  topLeft.addSpacer(0);

  let weekText = topLeft.addText("Days");
  weekText.textColor = Color.white();
  weekText.font = Font.thinSystemFont(24);

  // === TOP RIGHT COLUMN ===
  let topRight = topRow.addStack();
  topRight.size = new Size(halfSize, halfSize);
  topRight.cornerRadius = 8;
  topRight.setPadding(5, 15, 0, 0);
  // Show green checkmark only if today is in activityMapByDate and true
  let todayStr = new Date().toISOString().slice(0, 10);

  if (activityMapByDate[todayStr]) {
    let tickIcon = topRight.addImage(
      SFSymbol.named("checkmark.circle").image,
    );

    tickIcon.tintColor = Color.green();
    tickIcon.imageSize = new Size(42, 42);
  }

  // === BOTTOM ROW ===
  widget.addSpacer(0);

  let bottomRow = widget.addStack();
  bottomRow.layoutVertically();
  bottomRow.size = new Size(widgetSize, halfSize);
  //bottomRow.backgroundColor = new Color("#FFE66D")
  bottomRow.cornerRadius = 8;
  bottomRow.setPadding(8, 8, 8, 8);

  // Bold text title
  let title = bottomRow.addText(activityTitle);
  title.textColor = Color.white();
  title.font = Font.boldSystemFont(22);
  title.centerAlignText();

  bottomRow.addSpacer(8);

  // Row of 7 square boxes
  let boxesRow = bottomRow.addStack();
  boxesRow.layoutHorizontally();
  boxesRow.centerAlignContent();
  boxesRow.spacing = 4;

  const boxSize = 14;
  const totalBoxes = 7;

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  let today = new Date();
  let todayIndex = today.getDay(); // 0 (Sun) - 6 (Sat)

  for (let i = 0; i < totalBoxes; i++) {
    let box = boxesRow.addStack();
    box.size = new Size(boxSize, boxSize);
    box.cornerRadius = 2;

    // Calculate the date for this box (rightmost is today)
    let boxDate = new Date(today);
    boxDate.setDate(today.getDate() - (totalBoxes - 1 - i));
    let boxDateStr = boxDate.toISOString().slice(0, 10); // "YYYY-MM-DD"

    // Set background color based on activityMapByDate
    if (activityMapByDate[boxDateStr]) {
      box.backgroundColor = new Color("#33bb77");
    } else {
      box.backgroundColor = new Color("#333333");
    }

    // Calculate the day index for this box
    let dayIndex = boxDate.getDay();
    let dayChar = days[dayIndex];

    let title = box.addText(dayChar);
    title.font = Font.boldSystemFont(10);
    title.centerAlignText();
  }

  return widget;
}

let widget = createWidget("Read", 21, {
  "2025-06-24": false,
  "2025-06-23": false,
  "2025-06-22": true,
  "2025-06-21": true,
  "2025-06-20": false,
  "2025-06-19": true,
  "2025-06-18": true,
});

// Show widget
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentSmall();
}
Script.complete();
