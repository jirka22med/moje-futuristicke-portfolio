// conzol-log.js - Vylepšená verze s lepším formátováním

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Conzol-log.js: Inicializace vylepšeného systému pro záznam konzolových logů.');

    // 1. HTML struktura pro modalní okno s tabulkou logů
    const consoleLogModalHTML = `
        <div id="console-log-modal" class="modal">
            <div class="modal-content">
                <span class="close-button" id="close-console-log-modal">&times;</span>
                <h3>Výpis Konzole</h3>
                <div class="log-controls">
                    <button id="clear-console-log" class="button btn-danger">Vyčistit log</button>
                    <button id="export-console-log" class="button btn-secondary">Extrahovat log (HTML)</button>
                    <div class="log-stats">
                        <span id="log-count">Záznamy: 0</span>
                    </div>
                </div>
                <div class="log-table-container">
                    <table id="console-log-table">
                        <thead>
                            <tr>
                                <th>Čas</th>
                                <th>Typ</th>
                                <th>Zpráva</th>
                                <th>Akce</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Vložení HTML do DOMu
    document.body.insertAdjacentHTML('beforeend', consoleLogModalHTML);

    // Získání referencí na DOM elementy
    const consoleLogModal = document.getElementById('console-log-modal');
    const closeConsoleLogModalBtn = document.getElementById('close-console-log-modal');
    const clearConsoleLogBtn = document.getElementById('clear-console-log');
    const exportConsoleLogBtn = document.getElementById('export-console-log');
    const consoleLogTableBody = document.getElementById('console-log-table').querySelector('tbody');
    const logCountSpan = document.getElementById('log-count');

    let capturedLogs = []; // Pole pro ukládání zachycených logů
    let logIdCounter = 0; // Počítadlo pro unikátní ID logů

    // 2. Vylepšené formátování různých typů dat
    function formatLogMessage(args) {
        return args.map(arg => {
            if (arg === null) return 'null';
            if (arg === undefined) return 'undefined';
            
            const type = typeof arg;
            
            switch (type) {
                case 'string':
                    return arg;
                    
                case 'number':
                case 'boolean':
                    return String(arg);
                    
                case 'function':
                    return `[Function: ${arg.name || 'anonymous'}]`;
                    
                case 'object':
                    if (Array.isArray(arg)) {
                        return formatArray(arg);
                    }
                    
                    if (arg instanceof Error) {
                        return formatError(arg);
                    }
                    
                    if (arg instanceof Date) {
                        return `[Date: ${arg.toISOString()}]`;
                    }
                    
                    if (arg instanceof HTMLElement) {
                        return `[HTMLElement: ${arg.tagName.toLowerCase()}${arg.id ? '#' + arg.id : ''}${arg.className ? '.' + arg.className.split(' ').join('.') : ''}]`;
                    }
                    
                    return formatObject(arg);
                    
                default:
                    return String(arg);
            }
        }).join(' ');
    }

    // Formátování objektů s lepší čitelností
    function formatObject(obj, depth = 0, maxDepth = 3) {
        if (depth > maxDepth) {
            return '[Object: příliš hluboká struktura]';
        }
        
        try {
            const seen = new WeakSet();
            
            const formatValue = (value, currentDepth) => {
                if (value === null) return 'null';
                if (value === undefined) return 'undefined';
                if (typeof value === 'string') return `"${value}"`;
                if (typeof value === 'number' || typeof value === 'boolean') return String(value);
                
                if (typeof value === 'object') {
                    if (seen.has(value)) {
                        return '[Cyklická reference]';
                    }
                    seen.add(value);
                    
                    if (Array.isArray(value)) {
                        if (value.length === 0) return '[]';
                        if (currentDepth >= maxDepth) return `[Array(${value.length})]`;
                        const items = value.slice(0, 5).map(item => formatValue(item, currentDepth + 1));
                        return `[${items.join(', ')}${value.length > 5 ? `, ...${value.length - 5} dalších` : ''}]`;
                    }
                    
                    const keys = Object.keys(value);
                    if (keys.length === 0) return '{}';
                    if (currentDepth >= maxDepth) return `{${keys.length} vlastností}`;
                    
                    const pairs = keys.slice(0, 5).map(key => {
                        const val = formatValue(value[key], currentDepth + 1);
                        return `${key}: ${val}`;
                    });
                    
                    return `{${pairs.join(', ')}${keys.length > 5 ? `, ...${keys.length - 5} dalších` : ''}}`;
                }
                
                return String(value);
            };
            
            return formatValue(obj, depth);
        } catch (error) {
            return `[Chyba při formátování: ${error.message}]`;
        }
    }

    // Formátování polí
    function formatArray(arr) {
        if (arr.length === 0) return '[]';
        if (arr.length > 10) {
            const preview = arr.slice(0, 3).map(item => 
                typeof item === 'object' ? '[Object]' : String(item)
            ).join(', ');
            return `[${preview}, ...${arr.length - 3} dalších prvků]`;
        }
        return `[${arr.map(item => 
            typeof item === 'object' ? '[Object]' : String(item)
        ).join(', ')}]`;
    }

    // Formátování chyb
    function formatError(error) {
        return `${error.name}: ${error.message}${error.stack ? '\n' + error.stack : ''}`;
    }

    // 3. Přepsání konzolových funkcí pro zachytávání logů
    ['log', 'warn', 'error', 'info', 'debug'].forEach(methodName => {
        const originalMethod = console[methodName];
        console[methodName] = function(...args) {
            const timestamp = new Date().toLocaleString('cs-CZ', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                fractionalSecondDigits: 3
            });
            
            const message = formatLogMessage(args);
            const rawArgs = args; // Uložíme si původní argumenty pro detailní zobrazení
            
            const logEntry = { 
                id: ++logIdCounter,
                timestamp, 
                type: methodName, 
                message: message.length > 200 ? message.substring(0, 200) + '...' : message,
                fullMessage: message,
                rawArgs: rawArgs
            };
            
            capturedLogs.push(logEntry);
            addLogToTable(logEntry);
            updateLogCount();
            originalMethod.apply(console, args);
        };
    });

    // 4. Funkce pro přidání logu do tabulky
    function addLogToTable(logEntry) {
        const row = consoleLogTableBody.insertRow();
        row.className = `log-type-${logEntry.type}`;
        row.dataset.logId = logEntry.id;

        // Čas
        const timeCell = row.insertCell();
        timeCell.textContent = logEntry.timestamp;
        timeCell.classList.add('log-cell', 'log-time-cell');

        // Typ
        const typeCell = row.insertCell();
        typeCell.textContent = logEntry.type.toUpperCase();
        typeCell.classList.add(`log-type-${logEntry.type}-text`, 'log-cell', 'log-type-cell');

        // Zpráva
        const messageCell = row.insertCell();
        messageCell.textContent = logEntry.message;
        messageCell.classList.add('log-message-cell', 'log-cell');
        messageCell.title = logEntry.fullMessage; // Tooltip s plným textem

        // Akce
        const actionCell = row.insertCell();
        actionCell.classList.add('log-cell', 'log-action-cell');
        
        const detailBtn = document.createElement('button');
        detailBtn.textContent = 'Detail';
        detailBtn.className = 'log-detail-btn';
        detailBtn.onclick = () => showLogDetail(logEntry);
        
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Kopírovat';
        copyBtn.className = 'log-copy-btn';
        copyBtn.onclick = () => copyLogToClipboard(logEntry);
        
        actionCell.appendChild(detailBtn);
        actionCell.appendChild(copyBtn);

        // Udržování rolování na dně
        const container = consoleLogTableBody.parentElement;
        const shouldScroll = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
        if (shouldScroll) {
            container.scrollTop = container.scrollHeight;
        }
    }

    // 5. Zobrazení detailu logu
    function showLogDetail(logEntry) {
        const detailHtml = `
            <div class="log-detail-modal" id="log-detail-modal">
                <div class="log-detail-content">
                    <span class="close-button" onclick="closeLogDetail()">&times;</span>
                    <h3>Detail logu</h3>
                    <div class="log-detail-info">
                        <p><strong>Čas:</strong> ${logEntry.timestamp}</p>
                        <p><strong>Typ:</strong> <span class="log-type-${logEntry.type}-text">${logEntry.type.toUpperCase()}</span></p>
                    </div>
                    <div class="log-detail-message">
                        <h4>Plná zpráva:</h4>
                        <pre class="log-detail-text">${escapeHtml(logEntry.fullMessage)}</pre>
                    </div>
                    <div class="log-detail-raw">
                        <h4>Původní data (JSON):</h4>
                        <pre class="log-detail-text">${escapeHtml(JSON.stringify(logEntry.rawArgs, null, 2))}</pre>
                    </div>
                    <div class="log-detail-actions">
                        <button onclick="copyDetailToClipboard('${logEntry.id}')" class="btn-secondary">Kopírovat detail</button>
                        <button onclick="closeLogDetail()" class="btn-primary">Zavřít</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', detailHtml);
    }

    // Zavření detailního okna
    window.closeLogDetail = function() {
        const modal = document.getElementById('log-detail-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Kopírování detailu do schránky
    window.copyDetailToClipboard = function(logId) {
        const logEntry = capturedLogs.find(log => log.id == logId);
        if (logEntry) {
            const text = `Čas: ${logEntry.timestamp}\nTyp: ${logEntry.type}\nZpráva: ${logEntry.fullMessage}`;
            navigator.clipboard.writeText(text).then(() => {
                if (typeof window.showAlertModal === 'function') {
                    window.showAlertModal("Zkopírováno", "Detail logu byl zkopírován do schránky.");
                } else {
                    alert("Detail logu byl zkopírován do schránky.");
                }
            });
        }
    }

    // 6. Kopírování logu do schránky
    function copyLogToClipboard(logEntry) {
        const text = `[${logEntry.timestamp}] ${logEntry.type.toUpperCase()}: ${logEntry.fullMessage}`;
        navigator.clipboard.writeText(text).then(() => {
            if (typeof window.showAlertModal === 'function') {
                window.showAlertModal("Zkopírováno", "Log byl zkopírován do schránky.");
            } else {
                alert("Log byl zkopírován do schránky.");
            }
        }).catch(() => {
            // Fallback pro starší prohlížeče
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (typeof window.showAlertModal === 'function') {
                window.showAlertModal("Zkopírováno", "Log byl zkopírován do schránky.");
            } else {
                alert("Log byl zkopírován do schránky.");
            }
        });
    }

    // 7. Aktualizace počtu logů
    function updateLogCount() {
        logCountSpan.textContent = `Záznamy: ${capturedLogs.length}`;
    }

    // 8. Funkce pro zobrazení všech zachycených logů v tabulce
    function renderLogsToTable() {
        consoleLogTableBody.innerHTML = '';
        capturedLogs.forEach(log => addLogToTable(log));
        updateLogCount();
    }

    // 9. Vylepšená funkce pro generování HTML souboru s logy
    function generateHtmlLogFile() {
        if (capturedLogs.length === 0) {
            if (typeof window.showAlertModal === 'function') {
                window.showAlertModal("Prázdný log", "Žádné záznamy ke stažení.");
            } else {
                alert("Žádné záznamy ke stažení.");
            }
            return;
        }

        const logRowsHtml = capturedLogs.map(log => `
            <tr class="log-type-${log.type}">
                <td class="log-cell log-time-cell">${escapeHtml(log.timestamp)}</td>
                <td class="log-type-${log.type}-text log-cell log-type-cell">${escapeHtml(log.type.toUpperCase())}</td>
                <td class="log-message-cell log-cell" title="${escapeHtml(log.fullMessage)}">${escapeHtml(log.fullMessage)}</td>
            </tr>
        `).join('');

        const htmlContent = `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Výpis Konzole - ${new Date().toLocaleString('cs-CZ')}</title>
    <style>
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #f0f0f0;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: rgba(42, 42, 42, 0.8);
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
            color: #00ffff;
            margin: 0;
            font-size: 2.5em;
            text-shadow: 0 0 10px rgba(0,255,255,0.5);
        }
        
        .log-stats {
            margin-top: 10px;
            color: #aaa;
            font-size: 1.1em;
        }
        
        .log-container {
            background: rgba(42, 42, 42, 0.9);
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
            overflow: hidden;
            border: 1px solid #444;
        }
        
        .table-wrapper {
            overflow-x: auto;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.9em;
            background: #1a1a1a;
        }
        
        th {
            background: linear-gradient(135deg, #333 0%, #444 100%);
            color: #00ffff;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 15px 12px;
            text-align: left;
            position: sticky;
            top: 0;
            z-index: 10;
            border-bottom: 2px solid #00ffff;
        }
        
        td {
            padding: 12px;
            border-bottom: 1px solid #333;
            vertical-align: top;
        }
        
        tbody tr:nth-child(even) {
            background-color: rgba(34, 34, 34, 0.5);
        }
        
        tbody tr:hover {
            background-color: rgba(58, 58, 58, 0.7);
            transform: scale(1.001);
            transition: all 0.2s ease;
        }
        
        /* Styly pro různé typy logů */
        .log-type-log { border-left: 3px solid #f0f0f0; }
        .log-type-info { border-left: 3px solid #87ceeb; }
        .log-type-warn { border-left: 3px solid #ffd700; }
        .log-type-error { border-left: 3px solid #ff6347; }
        .log-type-debug { border-left: 3px solid #98fb98; }
        
        /* Styly pro text typu */
        .log-type-log-text { color: #f0f0f0; }
        .log-type-info-text { color: #87ceeb; font-weight: bold; }
        .log-type-warn-text { color: #ffd700; font-weight: bold; }
        .log-type-error-text { color: #ff6347; font-weight: bold; }
        .log-type-debug-text { color: #98fb98; font-weight: bold; }
        
        /* Vylepšené zalamování textu */
        .log-cell {
            word-wrap: break-word;
            word-break: break-word;
            white-space: pre-wrap;
            overflow-wrap: break-word;
            hyphens: auto;
            max-width: 0; /* Nutí flexibilní šířku */
        }
        
        .log-time-cell {
            width: 180px;
            min-width: 180px;
            font-size: 0.85em;
            color: #aaa;
            white-space: nowrap;
        }
        
        .log-type-cell {
            width: 80px;
            min-width: 80px;
            text-align: center;
            font-weight: bold;
        }
        
        .log-message-cell {
            width: auto;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 0.9em;
            line-height: 1.4;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            padding: 8px 12px !important;
        }
        
        footer {
            margin-top: 30px;
            text-align: center;
            padding: 20px;
            background: rgba(42, 42, 42, 0.5);
            border-radius: 8px;
            color: #888;
        }
        
        /* Responzivní design */
        @media (max-width: 768px) {
            body { padding: 10px; }
            h1 { font-size: 2em; }
            table { font-size: 0.8em; }
            th, td { padding: 8px; }
            .log-time-cell { width: 120px; min-width: 120px; }
            .log-type-cell { width: 60px; min-width: 60px; }
        }
        
        @media (max-width: 480px) {
            .log-time-cell { 
                width: 100px; 
                min-width: 100px;
                font-size: 0.75em;
            }
            .log-type-cell { 
                width: 50px; 
                min-width: 50px;
                font-size: 0.8em;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📋 Výpis Konzole</h1>
        <div class="log-stats">
            Celkem záznamů: ${capturedLogs.length} | 
            Vygenerováno: ${new Date().toLocaleString('cs-CZ')}
        </div>
    </div>
    
    <div class="log-container">
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>🕒 Čas</th>
                        <th>📋 Typ</th>
                        <th>💬 Zpráva</th>
                    </tr>
                </thead>
                <tbody>
                    ${logRowsHtml}
                </tbody>
            </table>
        </div>
    </div>
    
    <footer>
        <p>🔧 Vygenerováno automatickým systémem logování</p>
        <p>📅 ${new Date().toLocaleString('cs-CZ')}</p>
    </footer>
    
    <script>
        // Vylepšená navigace klávesnicí
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Home') {
                window.scrollTo(0, 0);
            } else if (e.key === 'End') {
                window.scrollTo(0, document.body.scrollHeight);
            }
        });
        
        // Zvýraznění při vyhledávání
        if (window.find) {
            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey && e.key === 'f') {
                    // Prohlížeč má vlastní vyhledávání
                }
            });
        }
    </script>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `console-log-${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        if (typeof window.showAlertModal === 'function') {
            window.showAlertModal("Export úspěšný", "Log byl úspěšně stažen jako HTML soubor.");
        } else {
            alert("Log byl úspěšně stažen jako HTML soubor.");
        }
    }

    // Pomocná funkce pro escapování HTML entit
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    // Event listenery
    exportConsoleLogBtn.addEventListener('click', generateHtmlLogFile);

    clearConsoleLogBtn.addEventListener('click', async () => {
        const confirmed = await (window.showConfirmModal ?
            window.showConfirmModal("Vyčistit log?", "Opravdu chcete vyčistit všechny záznamy konzole? Tato akce je nevratná.") :
            confirm("Opravdu chcete vyčistit všechny záznamy konzole? Tato akce je nevratná.")
        );

        if (confirmed) {
            capturedLogs = [];
            consoleLogTableBody.innerHTML = '';
            updateLogCount();
            if (typeof window.showAlertModal === 'function') {
                window.showAlertModal("Log vyčištěn", "Všechny záznamy konzole byly vyčištěny.");
            } else {
                alert("Všechny záznamy konzole byly vyčištěny.");
            }
        }
    });

    // Modal ovládání
    const openConsoleLogModalBtn = document.getElementById('open-console-log-modal-btn');
    if (openConsoleLogModalBtn) {
        openConsoleLogModalBtn.addEventListener('click', () => {
            renderLogsToTable();
            if (typeof window.showModal === 'function') {
                window.showModal(consoleLogModal);
            } else {
                consoleLogModal.classList.add('visible');
            }
        });
    }

    closeConsoleLogModalBtn.addEventListener('click', () => {
        if (typeof window.hideModal === 'function') {
            window.hideModal(consoleLogModal);
        } else {
            consoleLogModal.classList.remove('visible');
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === consoleLogModal) {
            if (typeof window.hideModal === 'function') {
                window.hideModal(consoleLogModal);
            } else {
                consoleLogModal.classList.remove('visible');
            }
        }
    });

    // Styly pro modal a tabulku
    const style = document.createElement('style');
    style.innerHTML = `
        /* Modal styly */
        #console-log-modal.modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        }

        #console-log-modal.modal.visible {
            opacity: 1;
            visibility: visible;
        }

        #console-log-modal .modal-content {
            background: linear-gradient(135deg, #2a2a2a 0%, #333 100%);
            padding: 25px;
            border-radius: 12px;
            width: 95%;
            max-width: 1200px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
            position: relative;
            color: #f0f0f0;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            border: 1px solid #444;
        }

        #console-log-modal .close-button {
            position: absolute;
            top: 15px;
            right: 25px;
            font-size: 28px;
            color: #aaa;
            cursor: pointer;
            transition: all 0.2s ease;
            background: none;
            border: none;
            padding: 5px;
            border-radius: 50%;
        }

        #console-log-modal .close-button:hover {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
            transform: scale(1.1);
        }

        #console-log-modal h3 {
            margin: 0 40px 25px 0;
            color: #00ffff;
            text-align: center;
            font-size: 2em;
            text-shadow: 0 0 8px rgba(0,255,255,0.6);
        }

        /* Ovládací prvky */
        .log-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .log-controls > div {
            display: flex;
            gap: 15px;
        }

        .log-stats {
            color: #aaa;
            font-size: 0.9em;
            font-weight: bold;
        }

        .log-controls button {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9em;
            font-weight: bold;
            transition: all 0.2s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .log-controls button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9em;
            transition: background-color 0.2s ease, transform 0.2s ease;
        }
               /*tady ses ani nedostal pokračovat v upravach css až dolu kde je slovo konec*/ 
        }

        /* Dodatečné styly pro lepší zobrazení dlouhých textů */
        .log-message-cell {
            word-wrap: break-word;
            white-space: pre-wrap;
            overflow-wrap: break-word;
            max-width: 100%;
            line-height: 1.4;
            font-family: 'Courier New', Courier, monospace;
        }

        /* Styly pro zvýraznění syntaxe objektů */
        .json-object {
            background-color: #2d2d2d;
            border-left: 3px solid #007bff;
            padding: 8px;
            margin: 4px 0;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            overflow-wrap: break-word;
        }

        .json-key {
            color: #9cdcfe;
            font-weight: bold;
        }

        .json-string {
            color: #ce9178;
        }

        .json-number {
            color: #b5cea8;
        }

        .json-boolean {
            color: #569cd6;
        }

        .json-null {
            color: #808080;
            font-style: italic;
        }

        /* Styly pro scrollbar v dark tématu */
        .log-table-container::-webkit-scrollbar {
            width: 12px;
        }

        .log-table-container::-webkit-scrollbar-track {
            background: #2d2d2d;
            border-radius: 6px;
        }

        .log-table-container::-webkit-scrollbar-thumb {
            background: #555;
            border-radius: 6px;
            border: 2px solid #2d2d2d;
        }

        .log-table-container::-webkit-scrollbar-thumb:hover {
            background: #777;
        }

        /* Animace pro nové řádky */
        .log-row-new {
            animation: slideIn 0.3s ease-out;
            background-color: #3a3a3a !important;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Styly pro filtrování podle typu */
        .log-filter-active .log-type-log { display: none; }
        .log-filter-active .log-type-info { display: none; }
        .log-filter-active .log-type-warn { display: none; }
        .log-filter-active .log-type-error { display: none; }
        .log-filter-active .log-type-debug { display: none; }

        .log-filter-active.show-log .log-type-log { display: table-row; }
        .log-filter-active.show-info .log-type-info { display: table-row; }
        .log-filter-active.show-warn .log-type-warn { display: table-row; }
        .log-filter-active.show-error .log-type-error { display: table-row; }
        .log-filter-active.show-debug .log-type-debug { display: table-row; }

        /* Responzivní úpravy pro velmi malé obrazovky */
        @media (max-width: 480px) {
            #console-log-modal .modal-content {
                width: 98%;
                height: 90%;
                margin: 5% 1%;
            }
            
            .modal-header {
                padding: 10px 15px;
                font-size: 1em;
            }
            
            .log-controls {
                padding: 10px 15px;
                flex-direction: column;
                align-items: stretch;
            }
            
            .log-controls button {
                width: 100%;
                margin: 2px 0;
            }
            
            #console-log-table {
                font-size: 0.75em;
            }
            
            #console-log-table th,
            #console-log-table td {
                padding: 6px;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('✅ Console-log.js: CSS styly inicializovány a připraveny.');
});
