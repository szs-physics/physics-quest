/* 4択の問題データ（RUSH・オンライン対戦で使う）。data.js の DATA から作る。
   形は化学の対戦（battle.js）の RUSH_FIELDS と同じ：
   {key, label, img(図のフォルダ), decks:[{name, field, items:[{id, q(HTML), c:[選択肢HTML], k:[正解の番号], e(解説), img, fix}]}], groups}
   fix: 選択肢の並びを変えない（＞＝＜・増加/減少・A/B など。data.js の order）
   分野（熱・波）はどちらも key 'phy' の中に入れる（decks の並び：熱の15単元 → 波の単元。
   オンライン対戦のルームの genre "F:phy:3" などがこれまでと同じ単元を指すように、熱を先にする） */
(function(){
  const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const fmt=t=>esc(t).replace(/\^\{([^}]*)\}/g,'<sup>$1</sup>').replace(/_\{([^}]*)\}/g,'<sub>$1</sub>');
  const BLANK=/\{\{([0-9①②ア-ン]+)\}\}/g;  // 熱は数字、波はカタカナの穴
  // 聞いている穴だけ【？】。同じ文の他の穴は正しい語句を（　）つきで強調して入れる（ドリルと同じ）
  const qhtml=it=>fmt(it.q).replace(BLANK,(_,k)=>k===it.blank?'<span class="blank target">？</span>'
    :(it.fills&&it.fills[k])?`<span class="blank key">（<b>${fmt(it.fills[k])}</b>）</span>`
    :'<span class="blank">〔　　〕</span>').replace(/\n/g,'<br>');
  function card(it){
    let words=[it.correct].concat(it.wrongs);
    if(it.order) words=words.slice().sort((a,b)=>it.order.indexOf(a)-it.order.indexOf(b));
    return {id:it.id, q:qhtml(it), c:words.map(fmt), k:[words.indexOf(it.correct)], e:fmt(it.exp||''),
      img:it.img||null, fix:!!it.order, ci:false, cat:it.cat, field:it.field};
  }
  const cats=DATA.categories;
  const fieldLabel=k=>(DATA.fields.find(f=>f.key===k)||{}).label||k;
  const unitNo=name=>parseInt(name,10);
  const idxOf=test=>cats.map((c,i)=>i).filter(i=>test(cats[i]));
  // 単元のまとまり（RUSH・オンライン対戦の範囲）。from〜to は熱の単元の番号
  const GROUPS=[
    {key:'gh', name:fieldLabel('heat')+' 全単元', field:'heat'},
    {key:'g1', name:'熱 前半', field:'heat', from:1, to:6},
    {key:'g2', name:'熱 中盤', field:'heat', from:7, to:11},
    {key:'g3', name:'熱 後半', field:'heat', from:12, to:15},
    {key:'gw', name:fieldLabel('wave')+' 全単元', field:'wave'}
  ];
  window.RUSH_FIELDS=[{
    key:'phy', label:'物理基礎', img:'assets/',
    decks:cats.map(c=>({name:c.name, field:c.field, items:DATA.items.filter(it=>it.cat===c.name).map(card)})),
    // decks: 含まれる単元（decks の添字）
    groups:GROUPS.map(g=>Object.assign({}, g, {
      decks:idxOf(c=>c.field===g.field&&(g.from==null||(unitNo(c.name)>=g.from&&unitNo(c.name)<=g.to)))
    }))
  }];
})();
