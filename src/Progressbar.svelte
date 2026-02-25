<script>
    export let maxTime;
    export let time;
</script>

<div class="w-full h-1 bg-blue-700/70">
    <div class="h-full bg-white" style="width: {`${time/maxTime*100}%`}"></div>
</div>