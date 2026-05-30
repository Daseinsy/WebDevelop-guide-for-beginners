(function () {
    "use strict";
    // Get dom element
    const form = document.getElementById('profileForm');
    const feedbackDiv = document.getElementById('formFeedback');
    // Default value backup (for reset)
    const defaultFullname = '';
    const defaultBirthdate = '2000-01-01';
    const defaultEducation = 'bachelor';
    const defaultBio = '热爱探索，乐于学习新事物。';
    // Gender default: male (radio checked has been set)
    // Hobby default: reading checked (checked)

    const x = document.getElementById("result");
    // Check browser support
    if (typeof (Storage) !== "undefined") {
        x.innerHTML = "Your browser supports Web storage!";
        // Store
        localStorage.setItem("lastname", "Smith");
        localStorage.setItem("bgcolor", "yellow");
        // Retrieve
        x.innerHTML = localStorage.getItem("lastname");
        x.style.backgroundColor = localStorage.getItem("bgcolor");
    } else {
        x.innerHTML = "Sorry, no Web storage support!";
    }

    // reset function
    window.resetFormToDefault = function () {
        // Name
        document.getElementById('fullname').value = defaultFullname;
        // Gender: Select male
        const genderRadios = document.getElementsByName('gender');
        for (let radio of genderRadios) {
            if (radio.value === 'male') {
                radio.checked = true;
                break;
            }
        }
        // date of birth
        document.getElementById('birthdate').value = defaultBirthdate;
        // Educational qualifications
        document.getElementById('education').value = defaultEducation;
        // Hobbies: Reset checkboxes, leaving only reading checked and others unchecked
        const hobbyCheckboxes = document.querySelectorAll('input[name="hobby"]');
        hobbyCheckboxes.forEach(cb => {
            cb.checked = (cb.value === 'reading');
        });
        // introduce yourself
        document.getElementById('bio').value = defaultBio;

        // Also clear the feedback preview
        feedbackDiv.innerHTML = `<strong>📬 预览：</strong> 表单已重置。填写后点击提交查看摘要。`;
    };
   
    // Collection
    // Collect text for selected hobbies (for preview)
    function getSelectedHobbies() {
        const checkedHobbies = document.querySelectorAll('input[name="hobby"]:checked');
        if (checkedHobbies.length === 0) return '（未选择任何爱好）';
        const labels = [];
        checkedHobbies.forEach(cb => {
            // Mapping Chinese according to value
            const hobbyMap = {
                'reading': '阅读', 'music': '音乐', 'sports': '运动',
                'travel': '旅行', 'gaming': '游戏', 'coding': '编程'
            };
            labels.push(hobbyMap[cb.value] || cb.value);
        });
        return labels.join('、');
    }

    // Get gender display text
    function getGenderLabel() {
        const selectedGender = document.querySelector('input[name="gender"]:checked');
        if (!selectedGender) return '未选择';
        const val = selectedGender.value;
        const map = { 'male': '男', 'female': '女', 'other': '其他', 'prefer-not': '不便透露' };
        return map[val] || val;
    }

    // Get academic qualification display text
    function getEducationLabel() {
        const select = document.getElementById('education');
        const selectedOption = select.options[select.selectedIndex];
        return selectedOption ? selectedOption.text : '未选择';
    }

    // Simple escaping to prevent XSS (although the content is all user input, it is safe when previewing)
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    // Additional: When the user clicks reset, the feedback is also restored to the default prompt (already implemented in the reset function)
    // But also dealing with a native reset via the browser? No dependencies, our custom reset button has already called resetFormToDefault
    // Extra: Sync feedback display once after page loads (friendly)
    window.addEventListener('DOMContentLoaded', function () {
        // Initial feedback does not display detailed data, but displays prompts
        feedbackDiv.innerHTML = `<strong>📬 预览：</strong> 填写后点击提交查看摘要。`;

        // Make sure gender is selected by default as male (if HTML has it selected, but just in case)
        const defaultGender = document.querySelector('input[name="gender"][value="male"]');
        if (defaultGender) defaultGender.checked = true;

    });
    // Optimization: If the user clicks reset directly, the above has been bound. Process the enter submission in the form again? No extra required.
    // A little easter egg for monitoring hobby changes? No need.



    // Submit processing -does not actually send data, only shows preview, and prevents page refresh
    window.handleSubmit = function (event) {
        event.preventDefault();     // Prevent refresh

        // Basic verification: name cannot be empty (HTML required has been done, but one more step has been added)
        const fullnameInput = document.getElementById('fullname');
        const fullname = fullnameInput.value.trim();
        if (!fullname) {
            feedbackDiv.innerHTML = `<strong>⚠️ 提示：</strong> 姓名不能为空，请填写您的姓名。`;
            fullnameInput.focus();
            return;
        }

        // Get birthday (formatted for human readability)
        const birthdateInput = document.getElementById('birthdate');
        let birthdateStr = birthdateInput.value;
        let displayDate = birthdateStr || '未填写';
        if (birthdateStr) {
            // Simple format yyyy-mm-dd -> year, month and day
            const parts = birthdateStr.split('-');
            if (parts.length === 3) {
                displayDate = `${parts[0]}年${parts[1]}月${parts[2]}日`;
            }
        }

        // introduce yourself
        const bioText = document.getElementById('bio').value.trim() || '（暂无介绍）';

        // collect other data
        const genderDisplay = getGenderLabel();
        const educationDisplay = getEducationLabel();
        const hobbiesDisplay = getSelectedHobbies();

        //Pure data collection, no actual submission, just display and download feedback
        const data_original = { fullname, genderDisplay, displayDate, educationDisplay, hobbiesDisplay, bioText };

        // construct the text content for download (with some formatting)
        const data_text = `
        个人信息表单提交记录
提交时间：${new Date().toLocaleString()}
====================
📬 已收到信息:${JSON.stringify(data_original, null, 2)}`;


        // Create download link
        const blob = new Blob([data_text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `表单数据_${fullname}_${new Date().getTime()}.txt`;
        a.click();
        URL.revokeObjectURL(url);

        // Construct feedback content (html formatted display)
        const data_html = `    
        👤 姓名：${escapeHtml(data_original.fullname)} &nbsp;|&nbsp; 
        ⚥  性别：${escapeHtml(data_original.genderDisplay)}<br>
        📅 生日：${escapeHtml(data_original.displayDate)} &nbsp;|&nbsp; 
        🎓 学历：${escapeHtml(data_original.educationDisplay)}<br>
        🎯 爱好：${escapeHtml(data_original.hobbiesDisplay)}<br>
        📝 自我介绍：${escapeHtml(data_original.bioText)}<br/>
        ====================`;
        feedbackDiv.innerHTML = `<p><em>✅ 信息已预览并下载为文本文件。</em></p>` + data_html;


    };



})();
