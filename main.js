// Mock Data & System Logic for K-MIMS
// -------------------------------------------------------

// 1. Departments & Patients Mapping
const departments = {
    '내과': [24002, 24005], // 이서준, 정시우(가명)
    '정형외과': [24001, 24003], // 김민준, 박도현
    '심리검사': [24004] // 최우진
};

// 2. Detailed Patient Database
const patientDB = {
    // [정형외과] 김민준 - 어깨 탈구
    24001: {
        basic: { name: '김민준', age: 19, gender: 'M', time: '09:00', status: '신검대기', active: true },
        vitals: { bmi: '24.5', bp: '128/82', vision: '1.0/0.8' },
        soap: {
            cc: '재발성 어깨 탈구 (Recurrent shoulder dislocation)',
            so: '과거력: 2년 전 운동 중 최초 탈구. 이후 3회 추가 탈구 병력.\n제출된 외부 MRI상 Bankart lesion 관찰됨.\nROM 제한 소견 있음.',
            a: 'Recurrent dislocation of shoulder region'
        },
        orders: [
            { code: 'MRI-S', name: 'Shoulder MRI (조영제)', status: '영상판독완료' },
            { code: 'ROM-T', name: '관절가동범위 측정', status: '완료 (제한있음)' }
        ],
        history: [
            { date: '2023.11.05', diag: 'S43.0 어깨관절의 탈구', images: ['./img/body_chart.png'] } // 임시 이미지
        ],
        ai: {
            grade: '4급 (보충역)',
            confidence: '98.5%',
            logic: '<strong>[종합 의견]</strong><br>제출된 MRI 영상 분석 결과(Vector DB 유사도 0.92)와 과거 진료 이력을 종합할 때, <u>검사규칙 제203조</u>에 부합함. 재발성 탈구 기록이 명확하여 4급 처분이 타당함.'
        }
    },

    // [내과] 이서준 - 고혈압/역류성 식도염
    24002: {
        basic: { name: '이서준', age: 19, gender: 'M', time: '09:15', status: '정밀검사', active: true },
        vitals: { bmi: '28.1', bp: '155/98', vision: '0.5/0.7' },
        soap: {
            cc: '두통 및 어지러움, 속쓰림 (Headache, Heartburn)',
            so: '혈압 재검 시 150/95mmHg 측정됨.\n내시경 상 식도 하부 미란 관찰됨 (LA-B).\n약물 복용 과거력 없음.',
            a: 'Essential hypertension / GERD'
        },
        orders: [
            { code: 'BP-24', name: '24시간 혈압 측정', status: '진행중' },
            { code: 'EGD', name: '위내시경 검사', status: '결과확인' },
            { code: 'ECG', name: '심전도 (EKG)', status: '정상' }
        ],
        history: [
            {
                date: '2023.10.12',
                diag: 'K21.0 위-식도역류병',
                images: ['./img/endoscopy.png']
            },
            {
                date: '2023.05.20',
                diag: 'J02.9 상세불명의 급성 인두염',
                images: ['./img/throat_exam.png']
            }
        ],
        ai: {
            grade: '3급 (현역)',
            confidence: '92.0%',
            logic: '<strong>[종합 의견]</strong><br>고혈압 수치가 2회 연속 높게 측정되었으나, 약물 치료 이력이 없고 장기적인 합병증 소견이 없어 <u>검사규칙 제47조</u>에 따라 3급 판정이 적절함.'
        }
    },

    // [정형외과] 박도현 - 십자인대 파열
    24003: {
        basic: { name: '박도현', age: 20, gender: 'M', time: '09:30', status: '재검대상', active: true },
        vitals: { bmi: '23.0', bp: '120/80', vision: '1.2/1.2' },
        soap: {
            cc: '좌측 무릎 통증 및 불안정성 (Lt. Knee Instability)',
            so: '축구 경기 중 "뚝" 소리와 함께 수상.\nLachman test 양성 (+).\nMRI상 ACL 완전 파열 소견.',
            a: 'Complete rupture of ACL, Lt. Knee'
        },
        orders: [
            { code: 'MRI-K', name: 'Knee MRI', status: '영상판독완료' },
            { code: 'Lachman', name: '이학적 검사', status: '양성' }
        ],
        history: [
            { date: '2024.01.15', diag: 'S83.5 무릎의 십자인대 파열', images: [] } // 적절한 이미지가 없어 생략
        ],
        ai: {
            grade: '5급 (전시근로역)',
            confidence: '99.9%',
            logic: '<strong>[종합 의견]</strong><br>MRI상 전방십자인대 완전 파열이 확인되며, 재건술이 필요한 상태임. <u>검사규칙 제185조</u>에 의거하여 5급 면제 판정 대상.'
        }
    },

    // [심리검사] 최우진 - 우울증
    24004: {
        basic: { name: '최우진', age: 19, gender: 'M', time: '09:45', status: '판정대기', active: true },
        vitals: { bmi: '21.4', bp: '115/75', vision: '1.0/1.0' },
        soap: {
            cc: '우울감, 불면증, 식욕 부진',
            so: 'MMPI-2 결과: D(우울) 척도 85T 상승.\n문장완성검사(SCT)에서 부정적 자아상 관찰.\n최근 3개월간 정신건강의학과 통원 치료 중.',
            a: 'Depressive episode, unspecified'
        },
        orders: [
            { code: 'MMPI-2', name: '다면적 인성검사', status: '분석완료' },
            { code: 'PSY-INT', name: '임상심리사 면담', status: '진행완료' }
        ],
        history: [
            { date: '2023.12.01', diag: 'F32.9 상세불명의 우울에피소드', images: [] },
            { date: '2023.11.20', diag: 'G47.0 불면증', images: [] }
        ],
        ai: {
            grade: '7급 (재검)',
            confidence: '88.1%',
            logic: '<strong>[종합 의견]</strong><br>현재 치료 기간이 6개월 미만으로, 증상의 고착 여부를 판단하기 어려움. <u>검사규칙 제102조</u>에 따라 6개월 후 재검 판정이 필요함.'
        }
    },

    // [내과] 정시우 - 흉부 이상
    24005: {
        basic: { name: '정시우', age: 19, gender: 'M', time: '10:00', status: '신검대기', active: true },
        vitals: { bmi: '19.5', bp: '110/70', vision: '0.9/0.9' },
        soap: {
            cc: '간헐적 흉통 (Chest pain)',
            so: '흉부 X-ray상 특이 소견: 기흉 의심 음영.\n청진 시 호흡음 감소.',
            a: 'Pneumothorax, Lt. side suspected'
        },
        orders: [
            { code: 'CXR', name: 'Chest PA', status: '촬영완료' },
            { code: 'CT-Chest', name: '흉부 CT', status: '예약필요' }
        ],
        history: [
            {
                date: '2024.01.28',
                diag: 'J93.9 상세불명의 기흉',
                images: ['./img/chest_xray.png']
            }
        ],
        ai: {
            grade: '7급 (재검)',
            confidence: '95.0%',
            logic: '<strong>[종합 의견]</strong><br>기흉 소견이 의심되나 정확한 폐 허탈 정도 확인을 위해 CT 촬영이 요망됨. 현재로서는 판정 보류(7급).'
        }
    }
};

// Current State
let currentDept = '내과'; // Default
let currentPatientId = null;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initDepartmentNav();
    switchDepartment('내과'); // Load initial department
    initPenChart();
    initResizing();
    initImageViewer();
});

// -------------------------------------------------------
// 3. Logic Implementation
// -------------------------------------------------------

// A. Department Navigation
function initDepartmentNav() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Parse dept name (Simple matching)
            const text = btn.textContent;
            let dept = '내과';
            if (text.includes('정형외과')) dept = '정형외과';
            if (text.includes('심리검사')) dept = '심리검사';

            switchDepartment(dept);
        });
    });
}

function switchDepartment(deptName) {
    currentDept = deptName;
    const pIds = departments[deptName] || [];

    // Render Patient List
    const listEl = document.querySelector('.patient-list');
    if (pIds.length === 0) {
        listEl.innerHTML = '<li style="padding:10px; color:#999;">대기중인 수검자가 없습니다.</li>';
        clearWorkarea();
        return;
    }

    listEl.innerHTML = pIds.map(id => {
        const p = patientDB[id].basic;
        return `
        <li class="p-item" data-id="${id}" onclick="selectPatient(${id})">
            <div>
                <span>${p.name}</span>
                <span>${p.time}</span>
            </div>
            <div>${p.age}세 • ${p.status}</div>
        </li>
        `;
    }).join('');

    // Auto-select first patient
    if (pIds.length > 0) {
        selectPatient(pIds[0]);
    }
}

// B. Patient Selection & Rendering
window.selectPatient = (id) => {
    currentPatientId = id;
    const data = patientDB[id];
    if (!data) return;

    // 1. Highlight List Item
    document.querySelectorAll('.p-item').forEach(el => el.classList.remove('active'));
    const target = document.querySelector(`.p-item[data-id="${id}"]`);
    if (target) target.classList.add('active');

    // 2. Update Basic Info Bar
    document.getElementById('p-name').textContent = data.basic.name;
    document.getElementById('p-meta').textContent = `수검번호 ${id} / ${data.basic.age}세 / ${data.basic.gender}`;

    // Update Vitals (Manual update of innerHTML for simplicity in this demo)
    const vitalsEl = document.querySelector('.p-vitals');
    vitalsEl.innerHTML = `<span>BMI ${data.vitals.bmi}</span> <span>BP ${data.vitals.bp}</span> <span>시력 ${data.vitals.vision}</span>`;

    // 3. Update SOAP
    document.getElementById('soap-cc').value = data.soap.cc;
    document.getElementById('soap-so').value = data.soap.so;
    document.getElementById('soap-assessment').value = data.soap.a;

    // 4. Update Order Table
    const orderBody = document.getElementById('order-table-body');
    orderBody.innerHTML = data.orders.map(o => `
        <tr>
            <td>${o.code}</td>
            <td>${o.name}</td>
            <td>${o.status}</td>
        </tr>
    `).join('');

    // 5. Update History
    const historyContainer = document.getElementById('history-list-container');
    historyContainer.innerHTML = data.history.map(h => `
        <div class="history-item">
            <div class="h-date">${h.date} (일자)</div>
            <div class="h-content">
                <div class="h-diag">${h.diag}</div>
                <div class="h-imgs">
                    ${h.images.map(img => `
                        <div class="h-img" style="background-image: url('${img}');"></div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // 6. Update AI Result
    document.getElementById('ai-grade').textContent = data.ai.grade;
    document.getElementById('ai-grade').className = `grade-badge ${getGradeClass(data.ai.grade)}`;
    document.getElementById('ai-confidence').textContent = `일치율 ${data.ai.confidence}`;
    document.getElementById('ai-logic').innerHTML = data.ai.logic;

    // Optional: Clear Canvas on patient switch
    const canvas = document.getElementById('penCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function getGradeClass(gradeText) {
    if (gradeText.includes('3급')) return 'g3'; // Need CSS for this if standard is Green/Blue
    if (gradeText.includes('4급')) return 'g4';
    if (gradeText.includes('5급')) return 'g5'; // Red?
    if (gradeText.includes('7급')) return 'g7'; // Grey?
    return 'g4';
}

function clearWorkarea() {
    // Optional: Reset fields when no patient
}


// -------------------------------------------------------
// Existing Modules (Pen Chart, Resizer, Image Viewer)
// -------------------------------------------------------

function initPenChart() {
    const canvas = document.getElementById('penCanvas');
    const wrapper = document.querySelector('.canvas-wrapper');
    const ctx = canvas.getContext('2d');

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

            const prevClass = gutter.dataset.prev;
            const nextClass = gutter.dataset.next;

            prevElement = document.querySelector(`.${prevClass}`);
            nextElement = document.querySelector(`.${nextClass}`);

            startX = e.clientX;
            startPrevWidth = prevElement.getBoundingClientRect().width;
            startNextWidth = nextElement.getBoundingClientRect().width;

            gutter.classList.add('dragging');
            document.body.style.cursor = 'col-resize';
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing || !prevElement || !nextElement) return;

        const delta = e.clientX - startX;
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

function initImageViewer() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById("expandedImg");
    const captionText = document.getElementById("imgCaption");
    const closeBtn = document.querySelector(".close-modal");

    const historyList = document.querySelector('.history-list');
    if (historyList) {
        historyList.addEventListener('click', (e) => {
            if (e.target.classList.contains('h-img')) {
                const style = window.getComputedStyle(e.target);
                const bgImage = style.backgroundImage;
                let src = bgImage.slice(4, -1).replace(/["']/g, "");

                if (src) {
                    modal.style.display = "flex";
                    requestAnimationFrame(() => {
                        modal.classList.add('show');
                    });
                    modalImg.src = src;

                    const item = e.target.closest('.history-item');
                    let diagText = '';
                    if (item) {
                        const diagEl = item.querySelector('.h-diag');
                        if (diagEl) diagText = diagEl.textContent;
                    }
                    captionText.innerHTML = diagText;
                }
            }
        });
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });
}
