<script>
    import "./app.css";
    import { onMount } from "svelte";
    import AnswerButton from "./AnswerButton.svelte";
    import TitlePage from "./TitlePage.svelte";
    import Progressbar from "./Progressbar.svelte";
    import GameoverModal from "./GameoverModal.svelte";
    import FancyScore from "./FancyScore.svelte";
    import { getQuizdataAsync } from "./quizdataFactory"; //getQuizdataを読み込む
    const [
        InitialState,
        TitleState,
        QuestionState,
        AnswerState,
        GameoverState,
        QuizStart,
    ] = [0, 1, 2, 3, 4, 5];
    const maxTime = 10;
    let time = maxTime;
    let state = InitialState;
    let gameoverModal;
    let currentScore = 0;
    let renzokuSeikai = 0;
    let fancyScore;
    //let quizdata = getQuizdata(); //getQuizdata関数を呼び出す
    let quizdata;

    onMount(changeToTitle);

    function changeToTitle() {
        gameoverModal.closeModal();
        state = TitleState;
    }
    async function changeToQuestionAsync() {
        quizdata = await getQuizdataAsync();
        state = QuestionState;
    }
    function changeToAnswer() {
        state = AnswerState;
        setTimeout(() => {
            if (state === AnswerState) {
                changeToQuestionAsync();
            }
        }, 1000);
    }
    function changeToGameover() {
        state = GameoverState;
        gameoverModal.showModal(fancyScore.getScore());
    }

    function changeToQuizstart() {
        state = QuizStart;
        time = maxTime;
        const timer = setInterval(() => {
            if (state === QuestionState && time < 0) {
                clearInterval(timer);
                changeToGameover();
            }
            if (state === QuestionState) {
                time -= 0.1;
            }
        }, 100);
        changeToQuestionAsync();
    }

    function answerButtonClicked(isCorrect) {
        if (state !== QuestionState) return;
        fancyScore.updateScore(isCorrect);
        if (fancyScore.getRenzokuSeikai() >= 5) {
            time = Math.min(time + 1, maxTime);
        } else if (!isCorrect) {
            time -= 1;
        }
        changeToAnswer();
    }
</script>

<svelte:head>
    <title>QuizApp</title>
</svelte:head>

<main
    class="bg-[url('/src/assets/fish.jpg')] bg-[size:100%] bg-repeat flex flex-col h-svh"
>
    {#if state === TitleState}
        <TitlePage on:click={changeToQuizstart}></TitlePage>
    {:else if state === QuestionState || state === AnswerState || state === GameoverState}
        <!-- メニューバー -->
        <FancyScore bind:this={fancyScore} />

        <!-- プログレスバー -->
        <Progressbar {maxTime} {time} />

        <!-- 問題 -->
        <div class="bg-white/60 font-extrabold text-center text-4xl py-4">
            {quizdata.mondai}
        </div>

        <!-- 選択肢 -->
        <div
            class="bg-blue-200 flex flex-col justify-around flex-grow items-center"
        >
            {#each quizdata.taku as t}
                <AnswerButton
                    isGrayout={state === AnswerState && quizdata.seikai !== t}
                    on:click={() => answerButtonClicked(quizdata.seikai === t)}
                    >{t}</AnswerButton
                >
            {/each}
        </div>
    {/if}
</main>

<GameoverModal bind:this={gameoverModal} onOKclick = {changeToTitle}  />
