import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://kwrzrcyqmvaoksygimad.supabase.co';//プロジェクトによって異なる
const supabaseKey = 'sb_publishable_YYwEF1nipPPkuzQ4pQ5CPg_yP4XzohH';  // プロジェクトによって異なる
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchKanjiYomiAsync(ids){
    const { data, error } = await supabase
        .from('SakanaKanji')
        .select('kanji, yomi')
        .in('id', ids);
    if (error) {
        console.error(error);
    }
    return data;
}

export async function fetchMondaisuAsync(){
    /* v2のマニュアル通りだとこうだと思うが、動作しない・・・。
    const { data, error} = await supabase
        .from('SakanaKanji')
        .select('*', { count: 'exact', head: true });
    if (error) {
        console.error(error);
    }
    return data.count;
    */
    
    const { error, count } = await supabase
        .from('SakanaKanji')
        .select('*', { count: 'exact', head: true });
    if (error) {
        console.error(error);
    }
    return count;
}

export async function insertScoreAsync(name, score){
    const { error } = await supabase
        .from('Ranking')
        .insert({ name, score });
    if (error) {
        console.error(error);
    }
}

export async function fetchRankingAsync(){
    const { data, error } = await supabase
        .from('Ranking')
        .select("score,name")
        .neq('name', '')
        .order('score', {ascending: false})
        .limit(10);
    if (error) {
        console.error(error);
    }
    return data;
}