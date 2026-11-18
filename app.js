'use strict';
const $ = id => document.getElementById(id);
const categories = {
  film:{title:'影像',english:'FILM',color:'#e8522c'},
  ip:{title:'IP 与视觉',english:'IDENTITY',color:'#39856f'},
  web:{title:'交互作品',english:'INTERACTION',color:'#5f67a9'}
};
const repo='https://github.com/haohaokkai/mengniu-worldcup-ai-campaign';
const original='https://haohaokkai.github.io/mengniu-worldcup-ai-campaign/';
const films=[
  ['pitch','没有草皮的第105场','蒙牛世界杯主题短片','一颗足球把乡村少年和世界杯球场连在一起。以人物、场景和足球的反复出现，串起这支一分钟品牌短片。','01:00'],
  ['dig','未来考古队','别让好奇心变成化石','跟随未来考古队走进恐龙园。孩子与恐龙伙伴一起探索，博物馆里的远古线索也随之鲜活起来。','03:00'],
  ['dust','尘土里的主场','华灿奖参赛改版','从尘土飞扬的乡村球场出发，围绕少年与足球重新组织画面和叙事。这是蒙牛世界杯项目的后续参赛版本。','01:00'],
  ['dream','恐龙会做梦吗','恐龙主题动画短片','在恐龙园的展厅和街景之间，跟着孩子与恐龙伙伴进入一场关于好奇心的冒险。','02:10']
].map(([id,title,series,desc,duration])=>({id,title,series,desc,duration,category:'film',cover:'assets/'+id+'.webp',video:'assets/'+id+'.mp4'}));
films[0].links=[['原作品页',original+'#mengniu']];films[2].links=[['原作品页',original+'#latest']];
const ipProjects=galleries.map(g=>({...g,category:'ip',series:g.id==='lanqiao'?'蓝桥杯 · 赛事视觉':g.id==='mascot'?'蓝桥杯 · 角色设计':'恐龙园 · 文创系列',desc:g.id==='lanqiao'?'青蓝色的“18”构成一道闸门，酸黄色的算法植物从裂缝中生长。三张评审展板展示了主视觉、赛事物料和文创延展。':g.id==='mascot'?'从主视觉、造型与表情设定，到服装和衍生品，浏览蓝桥杯吉祥物的完整设计稿。':'恐龙园文创周边作品集中的《'+g.title+'》系列。'}));
const webProjects=[
 {id:'kiln',title:'一窑万象',series:'交互式瓷器生成',desc:'一间可以亲手开窑的中国瓷艺实验室。逛数字展厅、查瓷器图鉴，再到瓷坊择窑、制坯、绘饰与烧制。',links:[['进入瓷艺实验室','https://8.134.217.179/']],images:[['assets/kiln.webp','中国千年瓷艺实验室 · 序厅']]},
 {id:'ops',title:'麒麟智运 · SafeOps',series:'智能运维平台',desc:'从运行总览查看安全与性能指标，追踪系统状态。下方展示项目界面，在线演示需使用已有授权账号登录。',links:[['打开在线演示','https://8.134.217.179/safeops/#/overview']],images:[['assets/ops.webp','安全智能运维态势']]},
 {id:'workflow',title:'品牌与 IP 内容生产工作流',series:'GitHub · 创作工具',desc:'从《小鲤鱼》的分镜制作到蒙牛世界杯实战，将需求拆解、镜头制作、剪辑与交付验收整理为可复用的 Dify 编排、Remotion 工程和 Python 工具。',links:[['浏览原作品集',original],['查看 GitHub 项目',repo]],images:[['assets/workflow.webp','原 GitHub 作品页']]}
].map(p=>({...p,category:'web',cover:p.images[0][0]}));
const carp={id:'carp',category:'film',series:'百度 AIGC · 动画分镜',title:'小鲤鱼历险记',desc:'从龙宫庆典到珊瑚迷宫，以首尾关键帧衔接动作和场景。这里选录六个分镜的起始画面。',cover:'assets/carp-1.webp',images:['U01','U02A','U05','U11','U18','U22'].map((name,i)=>['assets/carp-'+(i+1)+'.webp','分镜 '+name+' · 首帧'])};
const works=[films[1],ipProjects[0],webProjects[0],films[0],ipProjects[1],webProjects[1],films[2],films[3],carp,webProjects[2],...ipProjects.slice(2)];
const featured=[{work:films[0],lines:['没有草皮的','第 105 场'],tag:'品牌短片',action:'观看成片'},{work:films[1],lines:['未来考古队'],tag:'动画短片',action:'观看成片'},{work:webProjects[0],lines:['一窑万象'],tag:'交互体验',action:'预览项目'}];
let featureIndex=0, activeWork=null, imageIndex=0, activeFilter='all', opener=null;
const make=(tag,cls,txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(txt!=null)el.textContent=txt;return el};
function feature(step=0){
 featureIndex=(featureIndex+step+featured.length)%featured.length;
 const f=featured[featureIndex];$('hero-img').src=f.work.cover;$('hero-kind').textContent=f.tag;
 $('hero-title').replaceChildren();f.lines.forEach((line,i)=>{if(i)$('hero-title').append(make('br'));$('hero-title').append(line)});
 $('hero-desc').textContent=f.work.series;$('hero-open').replaceChildren(make('span','',f.work.video?'▶':'↗'),' '+f.action);
 $('slide-num').textContent='0'+(featureIndex+1)+' / 03';
}
function card(p){
 const a=make('a','card');a.href='#work/'+p.id;a.setAttribute('aria-label','预览'+p.title);
 a.style.setProperty('--tone',categories[p.category].color);
 const art=make('div','card-art'), img=make('img');img.src=p.cover;img.alt='';img.loading='lazy';img.decoding='async';
 art.append(img,make('span','stamp',p.video?'▶ '+p.duration:p.category==='web'?'↗ WEB':p.images.length+' 张'));
 const meta=make('div','card-meta',p.series);meta.append(make('em','',categories[p.category].english));
 a.append(art,meta,make('h3','',p.title));return a;
}
function filterBy(id){
 activeFilter=id;const list=works.filter(p=>id==='all'||p.category===id);
 $('grid').replaceChildren(...list.map(card));$('count').textContent='显示 '+list.length+' 个作品';
 for(const b of $('filters').children)b.setAttribute('aria-pressed',b.dataset.id===id);
}
for(const [id,title] of [['all','全部'],...Object.entries(categories).map(([id,c])=>[id,c.title])]){
 const b=make('button','',title);b.dataset.id=id;b.append(make('small','',String(works.filter(p=>id==='all'||p.category===id).length)));b.onclick=()=>filterBy(id);$('filters').append(b);
}
const dialog=$('viewer');
function renderNotes(p){
 const panel=document.getElementById('notes');panel.replaceChildren();if(p.id!=='lanqiao')return;
 for(const [title,body] of designNotes){const d=make('details');d.append(make('summary','',title),make('p','',body));panel.append(d)}
}
function setImageZoom(expanded){
 const preview=$('main-preview');
 preview.classList.toggle('expanded',expanded);
 preview.scrollTop=preview.scrollLeft=0;
 $('full-image').setAttribute('aria-pressed',String(expanded));
 $('full-image').textContent=expanded?'缩回预览':'查看大图';
}
$('full-image').onclick=()=>setImageZoom(!$('main-preview').classList.contains('expanded'));
for(const eventName of ['contextmenu','dragstart']){
 document.addEventListener(eventName,event=>{
  if(event.target instanceof Element && event.target.closest('img,video'))event.preventDefault();
 });
}
function updateImage(i){
 const pics=activeWork.images;imageIndex=(i+pics.length)%pics.length;const [src,label]=pics[imageIndex];
 const img=make('img','picture');img.src=src;img.alt=label;$('main-preview').replaceChildren(img);
 $('page-no').textContent=(imageIndex+1)+' / '+pics.length;
 setImageZoom(false);
 for(const [j,b] of [...$('thumbs').children].entries())b.setAttribute('aria-current',j===imageIndex);
 $('image-prev').hidden=$('image-next').hidden=pics.length<2;
}
function show(p){
 if(activeWork===p&&dialog.open)return;
 if(!dialog.open)opener=document.activeElement;activeWork=p;renderNotes(p);
 $('view-title').textContent=p.title;$('view-type').textContent=categories[p.category].title+'　/　'+p.series;
 $('view-desc').textContent=p.desc;$('main-preview').replaceChildren();$('thumbs').replaceChildren();
 $('links').replaceChildren(...(p.links||[]).map(([label,url])=>{const a=make('a','',label+' ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a}));
 setImageZoom(false);
 $('gallery-tools').hidden=!p.images;
 if(p.video){const v=make('video');v.src=p.video;v.poster=p.cover;v.controls=true;v.setAttribute('controlslist','nodownload');v.playsInline=true;v.preload='metadata';v.setAttribute('aria-label',p.title);$('main-preview').append(v)}
 else{if(p.images.length>1)p.images.forEach(([src,label],i)=>{const b=make('button');b.setAttribute('aria-label',label);b.onclick=()=>updateImage(i);const img=make('img');img.src=src;img.alt='';img.loading='lazy';b.append(img);$('thumbs').append(b)});updateImage(0)}
 if(!dialog.open)dialog.showModal();dialog.scrollTop=0;$('close').focus({preventScroll:true});
}
function closePreview(){
 if(history.state?.portfolioPreview){history.back()}else{history.replaceState(null,'',location.href.split('#')[0]+'#archive');sync()}
}
function sync(){
 const p=works.find(item=>location.hash==='#work/'+item.id);
 if(p){show(p);return}
 if(dialog.open){dialog.close();$('main-preview').replaceChildren();activeWork=null;if(opener?.isConnected)opener.focus({preventScroll:true})}
}
document.addEventListener('click',e=>{const a=e.target.closest('a.card');if(a&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey){e.preventDefault();openWork(works.find(p=>a.hash==='#work/'+p.id))}});
function openWork(p){history.pushState({portfolioPreview:true},'','#work/'+p.id);show(p)}
$('hero-open').onclick=()=>openWork(featured[featureIndex].work);$('previous').onclick=()=>feature(-1);$('next').onclick=()=>feature(1);
$('close').onclick=closePreview;dialog.addEventListener('cancel',e=>{e.preventDefault();closePreview()});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closePreview()}});
$('image-prev').onclick=()=>updateImage(imageIndex-1);$('image-next').onclick=()=>updateImage(imageIndex+1);
dialog.addEventListener('keydown',e=>{if(!activeWork?.images)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();updateImage(imageIndex+(e.key==='ArrowLeft'?-1:1))}});
window.addEventListener('hashchange',sync);window.addEventListener('popstate',sync);filterBy('all');sync();
