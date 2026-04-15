  // 5. JAVASCRIPT ДЛЯ РАБОТЫ АККОРДЕОНА
        document.addEventListener('DOMContentLoaded', () => {
            const questions = document.querySelectorAll('.faq-question');

            questions.forEach(question => {
                question.addEventListener('click', () => {
                    const item = question.closest('.faq-item');
                    
                    // Toggle (добавить/удалить) класс 'active' у родительского элемента
                    item.classList.toggle('active');

                   
                });
            });
        });
   
