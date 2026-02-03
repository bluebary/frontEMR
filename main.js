// Mock Patient Data (Military Candidates)
const patients = [
    { id: 24001, name: '김민준', age: 19, gender: 'M', time: '09:00', status: '신검대기' },
    { id: 24002, name: '이서준', age: 19, gender: 'M', time: '09:15', status: '정밀검사' },
    { id: 24003, name: '박도현', age: 20, gender: 'M', time: '09:30', status: '재검대상' },
    { id: 24004, name: '최우진', age: 19, gender: 'M', time: '09:45', status: '판정대기' },
    { id: 24005, name: '정시우', age: 19, gender: 'M', time: '10:00', status: '신검대기' }
];

document.addEventListener('DOMContentLoaded', () => {
    initPatientList();
    initPenChart();
    initResizing();
});

// 1. Patient List & Selection Logic
function initPatientList() {
    const listEl = document.querySelector('.patient-list');
    listEl.innerHTML = patients.map(p => `
        <li class="p-item" data-id="${p.id}" onclick="selectPatient(${p.id})">
            <div>
                <span>${p.name}</span>
                <span>${p.time}</span>
            </div>
            <div>${p.age}세 (05년생) • ${p.status}</div>
        </li>
    `).join('');
    if (patients.length > 0) selectPatient(patients[0].id);
}

window.selectPatient = (id) => {
    document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active'));
    const target = document.querySelector(`.p-item[data-id="${id}"]`);
    if (target) target.classList.add('active');
    const p = patients.find(x => x.id === id);
    if (p) {
        document.getElementById('p-name').textContent = p.name;
        document.getElementById('p-meta').textContent = `수검번호 ${p.id} / ${p.age}세 / 남`;
    }
};

// 2. Pen Chart Canvas Logic
function initPenChart() {
    const canvas = document.getElementById('penCanvas');
    const wrapper = document.querySelector('.canvas-wrapper');
    const ctx = canvas.getContext('2d');

    // Resize handling wrapper
    const resizeObserver = new ResizeObserver(() => {
        const rect = wrapper.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    });
    resizeObserver.observe(wrapper);

    let isDrawing = false;
    let currentColor = '#000000';

    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.id === 'clear-canvas') {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }
            currentColor = btn.dataset.color;
            document.querySelectorAll('.tool-btn:not(#clear-canvas)').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    function startDraw(e) {
        isDrawing = true;
        ctx.beginPath();
        const rect = canvas.getBoundingClientRect();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
    }

    function draw(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    }

    function stopDraw() {
        isDrawing = false;
        ctx.closePath();
    }

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseout', stopDraw);
}

// 3. Resizing Logic
function initResizing() {
    const gutters = document.querySelectorAll('.gutter');
    let isResizing = false;
    let activeGutter = null;
    let prevElement = null;
    let nextElement = null;
    let startX = 0;
    let startPrevWidth = 0;
    let startNextWidth = 0;

    gutters.forEach(gutter => {
        gutter.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isResizing = true;
            activeGutter = gutter;

            // Identify target columns
            const prevClass = gutter.dataset.prev;
            const nextClass = gutter.dataset.next;

            prevElement = document.querySelector(`.${prevClass}`);
            nextElement = document.querySelector(`.${nextClass}`);

            startX = e.clientX;
            startPrevWidth = prevElement.getBoundingClientRect().width;

            // Only need next width if we are constraining or doing push/pull, 
            // but simply changing prev width is enough if next is flex:1, 
            // however here next elements often have widths too.
            // If nextElement is flex:1 (like col-main), adjusting prevElement width will auto-shrink next.
            // If nextElement has fixed width (like others), we might need to push it?
            // Actually best strategy here: 
            // - Convert both elements involved to fixed pixel widths at start of drag
            // - Adjust both widths (prev + delta, next - delta) to keep total width constant

            startNextWidth = nextElement.getBoundingClientRect().width;

            gutter.classList.add('dragging');
            document.body.style.cursor = 'col-resize';
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing || !prevElement || !nextElement) return;

        const delta = e.clientX - startX;

        // Simple Logic: Increase prev, Decrease next
        // But need to respect min-widths defined in CSS
        const newPrevWidth = startPrevWidth + delta;
        const newNextWidth = startNextWidth - delta;

        if (newPrevWidth > 100 && newNextWidth > 100) {
            prevElement.style.flex = `0 0 ${newPrevWidth}px`;
            prevElement.style.width = `${newPrevWidth}px`;

            nextElement.style.flex = `0 0 ${newNextWidth}px`;
            nextElement.style.width = `${newNextWidth}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            activeGutter.classList.remove('dragging');
            document.body.style.cursor = 'default';
            activeGutter = null;
        }
    });
}
