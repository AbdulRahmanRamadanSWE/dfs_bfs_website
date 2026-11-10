const $=id=>document.getElementById(id);
const state={nodes:[],edges:[],directed:false,tool:'node',edgeFrom:null,selectedAlgo:'DFS',trace:[],step:0,playing:false,timer:null,codeMode:'recursive',lang:'en',drag:null};
const translations={
en:{subtitle:"Explore. Visualize. Solve.",eyebrow:"GRAPH ALGORITHMS • LEARNING LAB",headline:"Understand graph traversal,<br><em>one step at a time.</em>",intro:"Build a graph, run DFS or BFS, and inspect every decision made by the algorithm.",browserOnly:"Runs locally in your browser",visualLab:"VISUAL LAB",graphTitle:"Graph playground",sample:"Load example",clear:"Clear",addNode:"Add node",addEdge:"Add edge",directed:"Directed",nodeHint:"Tap empty space to add a node.",canvasNote:"Select “Add edge”, then tap two nodes.",dragNote:"Drag nodes to rearrange",runControl:"RUN CONTROL",algorithmSetup:"Algorithm setup",chooseAlgorithm:"Choose algorithm",startNode:"Starting node",run:"Run algorithm",reset:"Reset",speed:"Animation speed",hint:"Tip: Neighbor order affects the exact traversal order. Try changing the graph.",execution:"EXECUTION TRACE",stepByStep:"Step-by-step execution",notStarted:"Run an algorithm to inspect its decisions.",play:"Play",pause:"Pause",visitedOrder:"Visit order",cppReference:"C++ REFERENCE",cppImplementation:"Implementation",recursive:"Recursive DFS",iterative:"Iterative BFS/DFS",codeCaption:"Reference implementation for learning. The visualizer runs its own JavaScript engine.",nextLearning:"YOUR LEARNING PATH",nextTitle:"From understanding to problem solving",nextCopy:"This first release gives you the interactive foundation. Lessons, quizzes, and a C++ problem set will be added in the next stages.",footer:"Learning project · Phase 1",edgeHint:"Tap the first node, then the second node.",nodeAdded:"Node added",edgeAdded:"Edge added",graphCleared:"Graph cleared",noNodes:"Add at least one node first.",runDone:"Traversal completed.",start:"Start",discover:"Discover",visit:"Visit",finish:"Finish",emptyFrontier:"Empty",stack:"Stack (top → bottom)",queue:"Queue (front → back)",disconnected:"Traversal finished. Other disconnected components were not visited.",step:"Step"},
ar:{subtitle:"استكشف. تصوّر. حلّ.",eyebrow:"خوارزميات الرسوم البيانية • مختبر تعليمي",headline:"افهم اجتياز الرسوم البيانية،<br><em>خطوة بخطوة.</em>",intro:"أنشئ رسمًا بيانيًا، وشغّل DFS أو BFS، وافحص كل قرار تتخذه الخوارزمية.",browserOnly:"يعمل محليًا في متصفحك",visualLab:"المختبر المرئي",graphTitle:"مساحة تجارب Graph",sample:"تحميل مثال",clear:"مسح",addNode:"إضافة عقدة",addEdge:"إضافة حافة",directed:"موجّه",nodeHint:"اضغط على مساحة فارغة لإضافة عقدة.",canvasNote:"اختر «إضافة حافة»، ثم اضغط عقدتين.",dragNote:"اسحب العقد لإعادة ترتيبها",runControl:"التحكم بالتنفيذ",algorithmSetup:"إعداد الخوارزمية",chooseAlgorithm:"اختر الخوارزمية",startNode:"عقدة البداية",run:"تشغيل الخوارزمية",reset:"إعادة ضبط",speed:"سرعة الحركة",hint:"ملاحظة: ترتيب الجيران يؤثر في ترتيب الزيارة. جرّب تغيير الرسم.",execution:"سجل التنفيذ",stepByStep:"التنفيذ خطوة بخطوة",notStarted:"شغّل خوارزمية لمشاهدة قراراتها.",play:"تشغيل",pause:"إيقاف مؤقت",visitedOrder:"ترتيب الزيارة",cppReference:"مرجع C++",cppImplementation:"التنفيذ البرمجي",recursive:"DFS递عي",iterative:"BFS/DFS تكراري",codeCaption:"كود مرجعي للتعلم. المحاكي ينفذ الخوارزمية بمحرك JavaScript مستقل.",nextLearning:"مسار التعلم",nextTitle:"من الفهم إلى حل المسائل",nextCopy:"تمنحك هذه النسخة الأساس التفاعلي. سنضيف الدروس والاختبارات ومجموعة مسائل C++ في المراحل التالية.",footer:"مشروع تعليمي · المرحلة الأولى",edgeHint:"اضغط العقدة الأولى ثم العقدة الثانية.",nodeAdded:"تمت إضافة العقدة",edgeAdded:"تمت إضافة الحافة",graphCleared:"تم مسح الرسم",noNodes:"أضف عقدة واحدة على الأقل أولًا.",runDone:"اكتمل الاجتياز.",start:"بدء",discover:"اكتشاف",visit:"زيارة",finish:"إنهاء",emptyFrontier:"فارغ",stack:"المكدس (الأعلى ← الأسفل)",queue:"الطابور (الأمام ← الخلف)",disconnected:"انتهى الاجتياز. لم تتم زيارة المكونات المنفصلة الأخرى.",step:"الخطوة"}
};
const dfsCode=`#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> adj;
vector<bool> visited;

void dfs(int u) {
    visited[u] = true;
    cout << u << " ";

    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    adj.resize(n);
    visited.assign(n, false);

    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    dfs(0);
}`;
const bfsCode=`#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> adj;
vector<bool> visited;

void bfs(int start) {
    queue<int> q;
    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";

        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    adj.resize(n);
    visited.assign(n, false);

    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    bfs(0);
}`;
function t(k){return translations[state.lang][k]||k}
function toast(msg){$('toast').textContent=msg;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),1700)}
function addNode(x,y){const id=state.nodes.length?Math.max(...state.nodes.map(n=>n.id))+1:0;state.nodes.push({id,x,y});render();updateSelect();toast(t('nodeAdded'))}
function addEdge(a,b){if(a===b)return;if(state.edges.some(e=>(e.a===a&&e.b===b)||(!state.directed&&e.a===b&&e.b===a)))return;state.edges.push({a,b});render();toast(t('edgeAdded'))}
function loadSample(){state.nodes=[{id:0,x:105,y:205},{id:1,x:255,y:95},{id:2,x:255,y:315},{id:3,x:430,y:95},{id:4,x:430,y:315},{id:5,x:625,y:205}];state.edges=[[0,1],[0,2],[1,3],[1,4],[2,4],[3,5],[4,5]].map(([a,b])=>({a,b}));state.edgeFrom=null;state.trace=[];state.step=0;render();updateSelect();renderTrace();toast(t('sample'))}
function render(){const eg=$('edges'),ng=$('nodes');eg.innerHTML='';ng.innerHTML='';const current=state.trace[state.step-1];const visited=new Set(current?.visited||[]),frontier=new Set(current?.frontier||[]),cur=current?.current;
state.edges.forEach(e=>{const a=state.nodes.find(n=>n.id===e.a),b=state.nodes.find(n=>n.id===e.b);if(!a||!b)return;const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('x1',a.x);line.setAttribute('y1',a.y);line.setAttribute('x2',b.x);line.setAttribute('y2',b.y);line.setAttribute('class','edge'+(state.directed?' directed':''));if(visited.has(e.a)&&visited.has(e.b))line.classList.add('visited-edge');eg.appendChild(line)});
state.nodes.forEach(n=>{const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','node'+(visited.has(n.id)?' visited':'')+(frontier.has(n.id)?' frontier':'')+(cur===n.id?' current':''));g.dataset.id=n.id;const c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('cx',n.x);c.setAttribute('cy',n.y);c.setAttribute('r',21);const tx=document.createElementNS('http://www.w3.org/2000/svg','text');tx.setAttribute('x',n.x);tx.setAttribute('y',n.y+1);tx.textContent=n.id;g.append(c,tx);ng.appendChild(g)});$('graphStats').textContent=`${state.nodes.length} nodes · ${state.edges.length} edges`}
function updateSelect(){const s=$('startNode'),old=s.value;s.innerHTML='';state.nodes.forEach(n=>{const o=document.createElement('option');o.value=n.id;o.textContent=`Node ${n.id}`;s.appendChild(o)});if([...s.options].some(o=>o.value===old))s.value=old}
function adjacency(){const m=new Map(state.nodes.map(n=>[n.id,[]]));state.edges.forEach(({a,b})=>{m.get(a)?.push(b);if(!state.directed)m.get(b)?.push(a)});for(const a of m.values())a.sort((x,y)=>x-y);return m}
function buildTrace(){const adj=adjacency(),start=Number($('startNode').value),seen=new Set(),trace=[],order=[];let frontier=[];const add=(type,current,detail)=>trace.push({type,current,detail,visited:[...seen],frontier:[...frontier],order:[...order]});
if(state.selectedAlgo==='DFS'){const stack=[start];frontier=[...stack];add('start',null,`Initialize stack with node ${start}.`);while(stack.length){const u=stack.pop();frontier=[...stack];if(seen.has(u)){add('skip',u,`Node ${u} was already visited, so skip it.`);continue}seen.add(u);order.push(u);add('visit',u,`Visit node ${u}. Push its unvisited neighbors onto the stack in reverse order.`);const ns=(adj.get(u)||[]).filter(v=>!seen.has(v));for(let i=ns.length-1;i>=0;i--)stack.push(ns[i]);frontier=[...stack];add('push',u,ns.length?`Push ${ns.slice().reverse().join(', ')} onto the stack.`:`Node ${u} has no unvisited neighbors.`)}}
else{const q=[start];seen.add(start);frontier=[...q];add('start',null,`Mark node ${start} discovered and enqueue it.`);while(q.length){const u=q.shift();frontier=[...q];order.push(u);add('visit',u,`Dequeue and visit node ${u}. Inspect its neighbors in ascending order.`);for(const v of adj.get(u)||[]){if(!seen.has(v)){seen.add(v);q.push(v);frontier=[...q];add('discover',v,`Discover node ${v}, mark it visited, and enqueue it.`)}}}}
add('finish',null,`Traversal complete. Visit order: ${order.join(' → ')}.`);if(seen.size<state.nodes.length)trace[trace.length-1].detail+=` ${state.nodes.length-seen.size} node(s) are disconnected from the start.`;return trace}
function renderTrace(){const s=state.trace[state.step-1];$('stepCounter').textContent=`${state.step} / ${state.trace.length}`;$('explanation').textContent=s?`${t('step')} ${state.step}: ${s.detail}`:t('notStarted');const visited=s?.order||[];$('visitedCount').textContent=visited.length;$('visitedList').innerHTML=visited.length?visited.map((v,i)=>`<span class="token ${i===visited.length-1?'current':''}">${v}</span>`).join(''):'<span class="empty">—</span>';$('frontierTitle').textContent=state.selectedAlgo==='DFS'?t('stack'):t('queue');const f=s?.frontier||[];$('frontierCount').textContent=f.length;$('frontierList').innerHTML=f.length?f.map((v,i)=>`<span class="token">${v}</span>`).join(''):`<span class="empty">—</span>`;render();$('playBtn').innerHTML=(state.playing?'Ⅱ ':'▶ ')+`<span>${t(state.playing?'pause':'play')}</span>`}
function stop(){state.playing=false;if(state.timer)clearInterval(state.timer);state.timer=null;renderTrace()}
function goStep(n){state.step=Math.max(0,Math.min(state.trace.length,n));renderTrace();if(state.step>=state.trace.length)stop()}
function run(){stop();if(!state.nodes.length){toast(t('noNodes'));return}state.trace=buildTrace();state.step=0;goStep(1);toast(t('runDone'))}
function play(){if(!state.trace.length){run();if(!state.trace.length)return}if(state.step>=state.trace.length)state.step=0;state.playing=true;renderTrace();const delay=1100-Number($('speed').value)*180;state.timer=setInterval(()=>{if(state.step>=state.trace.length){stop();return}state.step++;renderTrace()},delay)}
function setAlgo(a){stop();state.selectedAlgo=a;$('dfsBtn').classList.toggle('selected',a==='DFS');$('bfsBtn').classList.toggle('selected',a==='BFS');state.trace=[];state.step=0;renderTrace();updateCode()}
function updateCode(){const recursive=state.codeMode==='recursive';$('codeBlock').textContent=state.selectedAlgo==='DFS'?(recursive?dfsCode:dfsCode.replace('void dfs(int u) {','void dfs(int start) {\\n    stack<int> st;\\n    st.push(start);\\n    while (!st.empty()) {\\n        int u = st.top(); st.pop();\\n        if (visited[u]) continue;\\n        visited[u] = true;\\n        cout << u << \" \";\\n        for (int i = (int)adj[u].size()-1; i >= 0; --i)\\n            if (!visited[adj[u][i]]) st.push(adj[u][i]);\\n    }\\n}\\n\\n/* iterative version */\\nvoid dfs_old(int u) {')):bfsCode}
function setLang(lang){state.lang=lang;document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(translations[lang][k])el.innerHTML=translations[lang][k]});$('langBtn').textContent=lang==='en'?'العربية':'English';$('toolHint').textContent=t(state.tool==='node'?'nodeHint':'edgeHint');$('frontierTitle').textContent=state.selectedAlgo==='DFS'?t('stack'):t('queue');renderTrace()}
$('graph').addEventListener('pointerdown',e=>{const p=$('graph').createSVGPoint();p.x=e.clientX;p.y=e.clientY;const pt=p.matrixTransform($('graph').getScreenCTM().inverse());const node=e.target.closest('.node');if(node){const id=Number(node.dataset.id);if(state.tool==='edge'){if(state.edgeFrom===null){state.edgeFrom=id;toast(t('edgeHint'))}else{addEdge(state.edgeFrom,id);state.edgeFrom=null}return}state.drag={id,dx:pt.x-state.nodes.find(n=>n.id===id).x,dy:pt.y-state.nodes.find(n=>n.id===id).y};$('graph').setPointerCapture(e.pointerId)}else if(state.tool==='node'){addNode(Math.max(25,Math.min(735,pt.x)),Math.max(25,Math.min(405,pt.y)))}})
$('graph').addEventListener('pointermove',e=>{if(!state.drag)return;const p=$('graph').createSVGPoint();p.x=e.clientX;p.y=e.clientY;const pt=p.matrixTransform($('graph').getScreenCTM().inverse());const n=state.nodes.find(n=>n.id===state.drag.id);n.x=Math.max(25,Math.min(735,pt.x-state.drag.dx));n.y=Math.max(25,Math.min(405,pt.y-state.drag.dy));render()});
$('graph').addEventListener('pointerup',()=>state.drag=null);
$('addNodeBtn').onclick=()=>{state.tool='node';state.edgeFrom=null;$('addNodeBtn').classList.add('active');$('addEdgeBtn').classList.remove('active');$('toolHint').textContent=t('nodeHint')};
$('addEdgeBtn').onclick=()=>{state.tool='edge';$('addEdgeBtn').classList.add('active');$('addNodeBtn').classList.remove('active');$('toolHint').textContent=t('edgeHint')};
$('directedToggle').onchange=e=>{state.directed=e.target.checked;render()};
$('sampleBtn').onclick=loadSample;
$('clearBtn').onclick=()=>{stop();state.nodes=[];state.edges=[];state.trace=[];state.step=0;render();updateSelect();renderTrace();toast(t('graphCleared'))};
$('dfsBtn').onclick=()=>setAlgo('DFS');$('bfsBtn').onclick=()=>setAlgo('BFS');
$('runBtn').onclick=run;$('resetBtn').onclick=()=>{stop();state.step=0;renderTrace()};
$('firstStep').onclick=()=>{stop();goStep(1)};$('prevStep').onclick=()=>{stop();goStep(state.step-1)};$('nextStep').onclick=()=>{stop();goStep(state.step+1)};$('lastStep').onclick=()=>{stop();goStep(state.trace.length)};
$('playBtn').onclick=()=>state.playing?stop():play();
$('speed').oninput=e=>$('speedValue').textContent=e.target.value+'×';
$('langBtn').onclick=()=>setLang(state.lang==='en'?'ar':'en');
$('recursiveTab').onclick=()=>{state.codeMode='recursive';$('recursiveTab').classList.add('active');$('iterativeTab').classList.remove('active');updateCode()};
$('iterativeTab').onclick=()=>{state.codeMode='iterative';$('iterativeTab').classList.add('active');$('recursiveTab').classList.remove('active');updateCode()};
loadSample();updateCode();setLang('en');
