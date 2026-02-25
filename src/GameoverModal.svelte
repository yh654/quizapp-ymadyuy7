<script>
    import {insertScoreAsync} from './supabase.js';

    let {onOKclick} = $props();

    let modal;
    let score;
    let name = '';

    export function showModal(currentScore){
        score = currentScore;
        name = localStorage.getItem("name") ?? "";
        modal.showModal();
    }
    export function closeModal(){
        modal.close();
    }
    function okButtonClicked(){
        localStorage.setItem("name", name);
        insertScoreAsync(name, score);
        if(onOKclick) onOKclick();
    }
</script>

<dialog bind:this={modal} class="border rounded-xl backdrop-blur-sm bg-white/30 p-10">
    <div class="text-center text-gray-700 flex flex-col items-center gap-10">
        <div class="text-2xl font-extrabold">ゲームオーバー</div>
        <div class="text-xl font-bold">
            スコア:{score}
        </div>
        <input bind:value={name} type="input" placeholder="名前の入力" class="p-3 border-none focus:outline-none rounded-xl w-full"/>
        <button onclick={okButtonClicked} class="text-xl w-1/2 border-2 border-gray-500 rounded-xl">OK</button>
    </div>
</dialog>