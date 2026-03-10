        const scrollport = document.getElementById('scrollport');
        const bodyTag = document.getElementById('bodyTag');
        const totalItems = 6;
        let activeWrapper = null;

        function initApp() {
            let html = '';
            for (let i = 0; i < 3; i++) {
                for (let j = 1; j <= totalItems; j++) {
                    const img = `Media/${j}.png`;
                    html += `
                        <div class="env-wrapper">
                            <div class="envelope-container">
                                <div class="env-base" style="background-image: url(${img})">
                                    <div class="env-flap" style="background-image: url(${img})"></div>
                                    <div class="card-body">
                                        <div class="greet-text" style="font-weight:900; font-size:1.3rem; color:#333;">يا [الاسم].. 👋</div>
                                        <div class="poem-text" style="color:#d63384; font-size:1.15rem; margin-top:20px; line-height:1.8; font-weight:500;">
                                            يا عسى عيدك مبارك وأيامك سعيد،<br>
                                            والفرح في دنيتك كل لحظة يزيد!<br>
                                            عساك من عواده. 🌸
                                        </div>
                                    </div>
                                    <div class="env-front" style="background-image: url(${img})"></div>
                                </div>
                            </div>
                        </div>`;
                }
            }
            scrollport.innerHTML = html;
            setTimeout(() => {
                scrollport.scrollLeft = (scrollport.scrollWidth / 3);
                updateActiveState();
            }, 200);
        }

        // دالة تحديد الظرف الأقرب للمركز (دقيقة جداً للابتوب والجوال)
        function updateActiveState() {
            const centerX = scrollport.scrollLeft + (scrollport.offsetWidth / 2);
            let closest = null;
            let minDistance = Infinity;

            document.querySelectorAll('.env-wrapper').forEach(el => {
                const elCenter = el.offsetLeft + (el.offsetWidth / 2);
                const distance = Math.abs(centerX - elCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = el;
                }
            });

            document.querySelectorAll('.env-wrapper').forEach(el => {
                el.classList.remove('is-active');
                if (el !== closest) el.classList.remove('open');
            });

            if (closest) {
                closest.classList.add('is-active');
                activeWrapper = closest;
            }
            
            // تحديث حالة الجسم لإخفاء المدخلات عند الحاجة
            if (!activeWrapper.classList.contains('open')) {
                bodyTag.classList.remove('has-open-card');
            }
        }

        scrollport.addEventListener('scroll', () => {
            updateActiveState();
            // السكرول اللانهائي
            const x = scrollport.scrollLeft;
            const w = scrollport.scrollWidth;
            if (x <= 10) scrollport.scrollLeft = w / 3;
            if (x >= (w * 2/3)) scrollport.scrollLeft = w / 3;
        });

        function toggleOpen() {
            if (activeWrapper) {
                activeWrapper.classList.toggle('open');
                bodyTag.classList.toggle('has-open-card', activeWrapper.classList.contains('open'));
            }
        }

        function updateName() {
            const name = document.getElementById('nameIn').value || "[الاسم]";
            document.querySelectorAll('.greet-text').forEach(el => el.innerText = `يا ${name}.. 👋`);
        }

        function sendWhatsApp() {
            const name = document.getElementById('nameIn').value || "صديقي";
            window.open(`https://wa.me/?text=${encodeURIComponent('يا ' + name + '.. عساك من عواده! ✨')}`);
        }

        initApp();