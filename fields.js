/* 4択の問題データ（RUSH・オンライン対戦で使う）。data.js の DATA から作る。
   形は化学の対戦（battle.js）の RUSH_FIELDS と同じ：
   {key, label, img(図のフォルダ), decks:[{name, items:[{id, q(HTML), c:[選択肢HTML], k:[正解の番号], e(解説), img, fix}]}]}
   fix: 選択肢の並びを変えない（＞＝＜・増加/減少・A/B など。data.js の order） */
(function(){
  const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const fmt=t=>esc(t).replace(/\^\{([^}]*)\}/g,'<sup>$1</sup>').replace(/_\{([^}]*)\}/g,'<sub>$1</sub>');
  const BLANK=/\{\{([0-9①②]+)\}\}/g;
  // 聞いている穴だけ【？】。同じ文の他の穴は正しい語句を（　）つきで強調して入れる（ドリルと同じ）
  const qhtml=it=>fmt(it.q).replace(BLANK,(_,k)=>k===it.blank?'<span class="blank target">？</span>'
    :(it.fills&&it.fills[k])?`<span class="blank key">（<b>${fmt(it.fills[k])}</b>）</span>`
    :'<span class="blank">〔　　〕</span>').replace(/\n/g,'<br>');
  function card(it){
    let words=[it.correct].concat(it.wrongs);
    if(it.order) words=words.slice().sort((a,b)=>it.order.indexOf(a)-it.order.indexOf(b));
    return {id:it.id, q:qhtml(it), c:words.map(fmt), k:[words.indexOf(it.correct)], e:fmt(it.exp||''),
      img:it.img||null, fix:!!it.order, ci:false, cat:it.cat};
  }
  // 単元のまとまり（RUSH・オンライン対戦の範囲）。from〜to は単元の番号
  const GROUPS=[
    {key:'g1', name:'前半', from:1, to:6},
    {key:'g2', name:'中盤', from:7, to:11},
    {key:'g3', name:'後半', from:12, to:15}
  ];
  const unitNo=name=>parseInt(name,10);
  window.RUSH_FIELDS=[{
    key:'phy', label:'物理基礎', img:'assets/',
    decks:DATA.categories.map(c=>({name:c.name, items:DATA.items.filter(it=>it.cat===c.name).map(card)})),
    // decks: 含まれる単元の番号（decks の添字）
    groups:GROUPS.map(g=>Object.assign({}, g, {
      decks:DATA.categories.map((c,i)=>i).filter(i=>{ const n=unitNo(DATA.categories[i].name); return n>=g.from&&n<=g.to; })
    }))
  }];
})();
