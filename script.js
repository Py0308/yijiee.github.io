const rows = 3; // 拼圖的行數
const cols = 3; // 拼圖的列數
const puzzle = document.getElementById('puzzle'); // 拼圖容器
const shuffleButton = document.getElementById('shuffle'); // 打亂拼圖按鈕
let pieces = []; // 存儲拼圖塊的數組
let selectedPieceIndex = null; // 目前選中的拼圖塊索引

// 初始化拼圖
function init() {
    pieces = []; // 清空拼圖塊數組
    puzzle.innerHTML = ''; // 清空拼圖容器
    for (let i = 0; i < rows * cols; i++) {
        const piece = document.createElement('div');
        piece.className = 'piece'; // 設定拼圖塊的樣式
        piece.style.backgroundImage = 'url(000.jpg)'; // 替換為你的圖片 URL
        piece.dataset.index = i; // 設定拼圖塊的索引
        piece.style.backgroundPosition = `-${(i % cols) * 100}px -${Math.floor(i / cols) * 100}px`; // 設定背景圖像的位置
        piece.addEventListener('click', handlePieceClick); // 設定點擊事件處理函數
        puzzle.appendChild(piece); // 將拼圖塊添加到容器中
        pieces.push(piece); // 將拼圖塊推入數組
    }
    shuffle(); // 打亂拼圖
}

// 處理拼圖塊的點擊事件
function handlePieceClick(event) {
    const clickedPieceIndex = parseInt(event.target.dataset.index); // 獲取點擊的拼圖塊的索引

    if (selectedPieceIndex === null) {
        selectedPieceIndex = clickedPieceIndex; // 記錄選中的拼圖塊索引
    } else {
        if (selectedPieceIndex !== clickedPieceIndex) {
            swapPieces(selectedPieceIndex, clickedPieceIndex); // 交換拼圖塊
            selectedPieceIndex = null; // 重置選中的拼圖塊索引

            if (checkPuzzleComplete()) { // 檢查拼圖是否完成
                alert('成功！'); // 顯示成功提示
                window.location.href = 'success.html'; // 跳轉到成功頁面
            }
        } else {
            selectedPieceIndex = null; // 如果點擊的是同一個拼圖塊，重置選中的拼圖塊索引
        }
    }
}

// 交換兩個拼圖塊的位置
function swapPieces(index1, index2) {
    const piece1 = pieces[index1]; // 獲取第一個拼圖塊
    const piece2 = pieces[index2]; // 獲取第二個拼圖塊

    // 交換拼圖塊的索引
    [piece1.dataset.index, piece2.dataset.index] = [piece2.dataset.index, piece1.dataset.index];

    // 交換拼圖塊的背景位置
    const pos1 = piece1.style.backgroundPosition;
    const pos2 = piece2.style.backgroundPosition;
    piece1.style.backgroundPosition = pos2;
    piece2.style.backgroundPosition = pos1;
}

// 檢查拼圖是否完成
function checkPuzzleComplete() {
    // 確保每個拼圖塊的索引都是它應有的位置
    return pieces.every((piece, index) => parseInt(piece.dataset.index) === index);
}

// 打亂拼圖塊的位置
function shuffle() {
    const indexes = [...Array(rows * cols).keys()]; // 創建一個包含 0 到 8 的數組
    indexes.sort(() => Math.random() - 0.5); // 隨機打亂數組

    pieces.forEach((piece, i) => {
        const index = indexes[i]; // 獲取新的索引
        piece.dataset.index = index; // 更新拼圖塊的索引
        piece.style.backgroundPosition = `-${(index % cols) * 100}px -${Math.floor(index / cols) * 100}px`; // 更新拼圖塊的背景位置
    });
}

// 添加打亂拼圖按鈕的事件處理程序
shuffleButton.addEventListener('click', shuffle);

// 初始化拼圖
init();
