var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Countdown } from "./CountDown.js";
import Home from "../../pages/Home.js";
import CheckChapters from "./CheckChapters.js";
// the chapter of the course
// if you determined the ended date you can increase the NEXTCHAPTER else uses that will be wrong
export let NEXTCHAPTER = 2;
export let CHAPTER = NEXTCHAPTER - 1;
export let CHAPTERFORTITLE = NEXTCHAPTER;
// end time
export let ended = "2/12/2022";
// the timer
export let timer = setTimeout(() => {
}, 1000);
const Counter = (dad, msg) => {
    // this method End & Handling all the things of this counter
    const EndAll = () => __awaiter(void 0, void 0, void 0, function* () {
        clearInterval(timer);
        dad.querySelector("#counter").remove();
        CheckChapters();
        Home();
    });
    if (ended && new Date().getTime() < new Date(ended).getTime()) {
        // the logic for the next chapter timer
        const logic = () => {
            const { isEnd, days, hours, min, sec } = Countdown(ended);
            if (isEnd) {
                EndAll();
                return;
            }
            const counter = document.querySelector("#counter");
            counter.innerHTML =
                `
                <div class="counter">
                    <p  title="what is the chapters?" class="text">
                        ${msg} 
                        ${days !== 0 ? days + " days | " : ""}
                        ${hours < 10 ? hours !== 0 ? "0" + hours + " hours | " : "" : hours + " hours | "}
                        ${min < 10 ? min !== 0 ? "0" + min + " minutes |" : "" : min + " minutes | "}
                        ${sec < 10 ? "0" + sec : sec} seconds 
                    </p>
                    <span class="close">x</span>
                </div>
                `;
            const close = document.querySelector(".counter .close");
            close.addEventListener("click", () => {
                dad.querySelector(".counter").remove();
                clearInterval(timer);
            });
            const counterEle = document.querySelector(".counter .text");
            counterEle.addEventListener("click", () => {
                // @ts-ignore
                cuteAlert({
                    type: "info",
                    title: "Chapters",
                    message: `You must complete all levels to get full mark  for this chapter before the next chapter <br>
                        The next chapter will be harder and newer questions`,
                    img: "img/question.svg",
                    buttonText: "Understood"
                });
            });
        };
        // before timer
        logic();
        // timer
        timer = setInterval(() => {
            logic();
        }, 1000);
    }
    else if (localStorage.getItem(`chapter_${CHAPTER}`) == null && CHAPTER !== 0) {
        EndAll();
    }
};
export default Counter;
//# sourceMappingURL=Counter.js.map