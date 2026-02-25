import {fetchKanjiYomiAsync, fetchMondaisuAsync} from './supabase.js';

let mondaisu;

/** 0以上max未満の整数をランダムに選ぶ関数 */
function randomRange(max){
    return Math.floor(Math.random() * max);
}

/**  0以上max以下の整数を重複なくlen個をランダムに選ぶ関数 */
function randomArray(max, len){
    const array = [];               // 空の配列を用意し、arrayと名付ける
    while(array.length < len){      // arrの長さがlen未満である限り、以下を繰り返し実行
        const r = randomRange(max); // rに0以上max未満の整数をランダムに選ぶ
        if(!array.includes(r)){     // rがarrayに含まれていなければ、以下を実行
            array.push(r);          // arrayの末尾にrを追加
        }
    }
    return array;                   // 作成したarrayを返す
}

const QAlist = [
    {Q: "鮪", A: "まぐろ"},
    {Q: "鰈", A: "かれい"},
    {Q: "鯛", A: "たい"},
    {Q: "鰹", A: "かつお"},
    {Q: "鯖", A: "さば"},
    {Q: "鱈", A: "たら"},
    {Q: "鮭", A: "さけ"},
    {Q: "鯵", A: "あじ"},
    {Q: "鮎", A: "あゆ"}
];


export async function getQuizdataAsync(){
    mondaisu ??= await fetchMondaisuAsync();
    /**  次のように書いたとの同じ意味
    if(mondaisu===undefined || mondaisu===null){
        mondaisu = await fetchMondaisuAsunc();
    }*/
    const numberOfTaku = 5;
    const takuID = randomArray(mondaisu, numberOfTaku); 
    const kanjiYomi = await fetchKanjiYomiAsync(takuID);
    const seikai = randomRange(numberOfTaku);
    return {
        mondai: kanjiYomi[seikai].kanji, 
        seikai: kanjiYomi[seikai].yomi, 
        taku: kanjiYomi.map((val) => val.yomi)
    };
}