let questionsData = {};

// Tải dữ liệu từ data.json
fetch(chrome.runtime.getURL("data.json"))
    .then(response => response.json())
    .then(data => {
        questionsData = data;
        displayQuestions(Object.entries(questionsData));
    })
    .catch(error => console.error("Lỗi tải dữ liệu:", error));

// Hiển thị danh sách câu hỏi
function displayQuestions(data) {
    let table = document.getElementById("qaTable");
    table.innerHTML = ""; // Xóa nội dung cũ

    data.forEach(([question, answer]) => {
        let row = document.createElement("tr");

        let questionCell = document.createElement("td");
        questionCell.innerText = question;

        let answerCell = document.createElement("td");
        answerCell.innerText = answer;

        row.appendChild(questionCell);
        row.appendChild(answerCell);
        table.appendChild(row);
    });
}

// Tìm kiếm câu hỏi (Tự động lọc khi nhập từ khóa)
document.getElementById("searchBox").addEventListener("input", () => {
    let query = document.getElementById("searchBox").value.toLowerCase();
    let filteredData = Object.entries(questionsData).filter(([q]) => q.toLowerCase().includes(query));
    displayQuestions(filteredData);
});
