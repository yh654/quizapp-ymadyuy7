<script>
           import RankingModal from "./RankingModal.svelte";
           let rankingModal;
            function showRanking(){
               rankingModal.showModal();
            }
        </script>
    
        <div class="flex flex-col justify-center items-center h-svh gap-16">
            <div class="text-7xl font-extrabold backdrop-blur-sm bg-white/20 p-4 rounded-2xl">
                Quiz App
            </div>
            <div class="text-4xl font-extrabold">
                魚へんの漢字
            </div>
            <button on:click class="bg-blue-700 text-white font-bold text-3xl rounded-full border-2 p-4 w-1/2">
                スタート
            </button>
            <button on:click={showRanking} class="bg-blue-700 text-white font-bold text-3xl rounded-full border-2 p-4 w-1/2">
                ランキング表示
            </button>
        </div>
    
       <RankingModal bind:this={rankingModal}/>