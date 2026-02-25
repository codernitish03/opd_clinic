let patientRecords = [];

        window.onload = function () {
            function updateDateTime() {
                const now = new Date();
                const formattedDateTime = now.toLocaleString('en-GB', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit',
                    hour12: true
                });
                document.getElementById('in-date').value = formattedDateTime;
            }
            updateDateTime();
            setInterval(updateDateTime, 1000);
        };

        window.onbeforeunload = function () {
            if (patientRecords.length > 0) {
                return "आपके पास सेव नहीं किए गए रिकॉर्ड्स हैं। क्या आप वाकई पेज छोड़ना चाहते हैं?";
            }
        }
        function processEntry() {
            let name = document.getElementById('in-name').value;
            let age = document.getElementById('in-age').value;
            let gender = document.getElementById('in-gender').value;
            let address = document.getElementById('in-address').value;
            let mobile = document.getElementById('in-mobile').value;

            // हमने सीधा इनपुट से बना-बनाया समय उठा लिया
            let fullDateTime = document.getElementById('in-date').value;

            if (!name || !gender) {
                alert("कृपया नाम और लिंग भरें");
                return;
            }

            // डेटा सेव करना (यहाँ हमने सीधे fullDateTime का उपयोग किया है)
            patientRecords.push({
                DateTime: fullDateTime,
                Name: name,
                Age: age,
                Sex: gender,
                Address: address,
                Mobile: mobile
            });

            // प्रिंट एरिया में डेटा भेजना
            document.getElementById('out-name').innerText = name;
            // अगर आपके HTML में id="out-age-sex" है तो उसे यहाँ सही करें
            if (document.getElementById('out-age-sex')) {
                document.getElementById('out-age-sex').innerText = age + "/" + gender;
            }
            document.getElementById('out-address').innerText = address;
            document.getElementById('out-mobile').innerText = mobile;
            document.getElementById('out-date').innerText = fullDateTime;

            window.print();
        }

        function downloadCSV() {
            // 1. सबसे पहले चेक करें कि क्या रिकॉर्ड्स मौजूद हैं
            if (patientRecords.length === 0) {
                alert("अभी कोई डेटा सेव नहीं है जिसे डाउनलोड किया जा सके!");
                return;
            }

            // 2. Yes/No वाला मैसेज (Alert Box)
            let confirmDownload = confirm("क्या आप आज के सभी " + patientRecords.length + " रिकॉर्ड्स को Excel/CSV में डाउनलोड करना चाहते हैं?");

            if (confirmDownload === true) {
                // अगर यूजर 'Yes' दबाए तो डाउनलोड शुरू करें
                let csvContent = "data:text/csv;charset=utf-8,DateTime,Name,Age,Sex,Address,Mobile\n";

                patientRecords.forEach(row => {
                    csvContent += `"${row.DateTime}","${row.Name}","${row.Age}","${row.Sex}","${row.Address}","${row.Mobile}"\n`;
                });
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "Clinic_Records_" + new Date().toLocaleDateString().replace(/\//g, '-') + ".csv");
                document.body.appendChild(link);
                link.click();

                alert("फ़ाइल सफलतापूर्वक डाउनलोड हो गई है!");
            } else {
                // अगर यूजर 'No' दबाए तो कुछ न करें
                console.log("Download cancelled");
            }
        }