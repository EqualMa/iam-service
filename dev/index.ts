import * as Cloudworker from "@dollarshaveclub/cloudworker";

const simpleScript = `addEventListener('fetch', event => {
  event.respondWith(new Response('hello to '+ event.request.url, {status: 200}))
})`;

const req = new Cloudworker.Request("https://myfancywebsite.com/someurl");
const cw = new Cloudworker(simpleScript);
cw.dispatch(req).then(res => {
  console.log("Response Status: ", res.status);
  res.text().then(body => {
    console.log("Response Body: ", body);
  });
});
