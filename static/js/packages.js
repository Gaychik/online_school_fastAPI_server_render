

        document.addEventListener('DOMContentLoaded', function() {
            const moreBtn = document.getElementById('showMoreBtn');
            const hiddenItems = document.getElementById('hiddenItems');
            
            if (moreBtn && hiddenItems) {
                moreBtn.addEventListener('click', function() {
                    if (hiddenItems.classList.contains('show')) {
                        hiddenItems.classList.remove('show');
                        moreBtn.textContent = 'Показать подробнее';
                        moreBtn.classList.remove('active');
                    } else {
                        hiddenItems.classList.add('show');
                        moreBtn.textContent = 'Скрыть';
                        moreBtn.classList.add('active');
                    }
                });
            }
        });
