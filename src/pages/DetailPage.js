import { Page } from "./Page.js";

export class DetailPage extends Page {
  constructor() {
    super(`
        <main>
            <div>디테일페이지</div>
        </main>
      `);
  }

  init() {
    console.log("init");
  }
}
