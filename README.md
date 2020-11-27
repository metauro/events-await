支持异步的事件发射器

## 使用

### promise
```javascript
import { AsyncEventEmitter } from "events-await";

const e = new AsyncEventEmitter();

e.on("touch", async (param) => {
  console.log("touch event", param);
});

e
  .emit("touch", "param1")
  .then(() => {
  	e.emit("touch", "param2");
	});

// touch event param1
// touch event param2
```

### async
```javascript
import { AsyncEventEmitter } from "events-await";

const e = new AsyncEventEmitter();
e.on("touch", async (param) => {
  console.log("touch event", param);
});
 
async function test() {
  await e.emit("touch", "param1") // touch event param1
  await e.emit("touch", "param2") // touch event param2
}

test()
```
