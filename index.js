const table = new Tabulator("#table-wrapper", {
    layout: "fitColumns",
    responsiveLayout: "collapse",
    groupBy: false, // ["header"]
    dataTree: false,
    dataTreeChildField: "_children",
    dataTreeFilter: true,
    dataTreeSort: true,
    dataTreeStartExpanded: false,
    dataTreeSelectPropagate: false,
    groupValues: [],
    // footerElement: "<button>Custom Button</button>",
    rowClick: (e, row) => {},
    addRowPos: "top",
    history: false,
    index: "id",
    height: "100%",
    paginationCounter: "rows",
    movableColumns: true,
    pagination: "local",
    paginationSize: 50,
    paginationButtonCount: 5,
    paginationInitialPage: 1,
    editor: false,
    keybindings: true,
    layoutColumnsOnNewData: true,
    placeholder: "No Data Available",
    resizableColumnFit: true,
    downloadRowRange: "active",
    selectable: true,
    selectablePersistence: false,
    tabEndNewRow: true,
    debugInvalidOptions: false,
    autoColumns: false,
    clipboard: "copy",
    printAsHtml: true,
    printConfig: {
        columnHeaders: true,
        columnGroups: true,
        rowGroups: true,
        columnCalcs: false,
        dataTree: true,
        formatCells: false,
    },
    downloadDataFormatter: data => {},
    downloadEncoder: (fileContents, blob) => {},
    printStyled: true,
    // rowClickPopup:"Im a Popup",
    // groupClickPopup:"Im a Popup (Group)",
    printRowRange: "active",
    clipboardCopyConfig: {
        columnHeaders: false,
        columnGroups: false,
        rowGroups: false,
        columnCalcs: false,
        dataTree: false,
        formatCells: false,
    },
    rowFormatter,
    initialFilter: [],
    initialSort: [{
        column: "id",
        dir: "asc"
    }, {
        column: "name",
        dir: "desc"
    }],
    columnDefaults: {
        tooltip: false,
    },
    persistence: {
        filter: true,
        columns: true,
    },
    htmlOutputConfig: {
        columnHeaders: true,
        columnGroups: true,
        rowGroups: true,
        columnCalcs: true,
        dataTree: true,
        formatCells: true,
    },
    cellRendered: function(cell, formatterParams, onRendered) {
        var value = cell.getValue();
        return '<span class="custom-cell">' + value + '</span>';
    },
    columns: [{
        formatter: "rowSelection",
        titleFormatter: "rowSelection",
        align: "center",
        headerSort: false,
        width: 20,
        resizable: "header"
    }, {
        title: "#",
        field: "id",
        visible: true,
        resizable: "header",
        formatter: cellFormatterIndex,
        titleFormatter: headerFormatter
    }, {
        title: "Name",
        field: "name",
        visible: true,
        resizable: "header",
        formatter: cellFormatter,
        titleFormatter: headerFormatter
    }, {
        title: "Task Progress",
        field: "progress",
        align: "left",
        visible: true,
        resizable: "header",
        formatter: "progress",
        formatter: cellFormatter,
        titleFormatter: headerFormatter
    }, {
        title: "Gender",
        field: "gender",
        width: 95,
        visible: true,
        resizable: "header",
        formatter: cellFormatter,
        titleFormatter: headerFormatter
    }, {
        title: "Rating",
        field: "rating",
        align: "center",
        width: 100,
        visible: true,
        resizable: "header",
        formatter: "star",
        formatter: cellFormatter,
        titleFormatter: headerFormatter
    }, {
        title: "Color",
        field: "color",
        width: 130,
        visible: true,
        resizable: "header",
        formatter: cellFormatter,
        titleFormatter: headerFormatter
    }, {
        title: "Date Of Birth",
        field: "date",
        width: 130,
        sorter: "date",
        align: "center",
        visible: true,
        resizable: "header",
        formatter: "datetime",
        formatter: cellFormatter,
        titleFormatter: headerFormatter
    }, {
        title: "Driver",
        field: "car",
        align: "center",
        sorter: "boolean",
        visible: true,
        resizable: "header",
        formatter: "tickCross",
        formatter: cellFormatter,
        titleFormatter: headerFormatter
    }, ],
});

table.on("cellClick", function(e, cell) {});

function headerFormatter(header) {
    header.getElement().classList.add("table-header", "cell");

    return `<span class="table-header-value">${header.getValue()}</span>`
}

function rowFormatter(row) {
    row.getElement().classList.add("table-row");

    return row._row.element
}

function cellFormatter(cell) {
    cell.getElement().classList.add("table-cell", "cell");
    cell.getElement().setAttribute("data-table-cell-key", cell.getElement().getAttribute("tabulator-field"));

    return `<span class="table-cell-value">${cell.getValue()}</span>`
}

function cellFormatterIndex(cell) {
    cell.getElement().setAttribute("data-table-cell-key-index", "true");

    return cellFormatter(cell)
}

table.on("tableBuilt", function(ev) {
    // # Table
    const tableWrapper = document.querySelector("#table-wrapper")

    // ## Header
    const headerWrapper = tableWrapper.querySelector(".tabulator-header")

    headerWrapper.classList.toggle("table-header-wrapper", true)

    // ### Container
    const headerContainer = headerWrapper.querySelector(".tabulator-header-contents")

    headerContainer.classList.toggle("table-header-container", true)

    // #### Columns
    const headers = headerContainer.querySelector(".tabulator-headers")

    // ##### Column
    headers.classList.toggle("table-header", true)

    // ##### Pallet
    const palletsResize = headers.querySelector(".tabulator-col-resize-handle")

    palletsResize.classList.toggle("table-header-pallet", true)

    // ###### Title
    const columnsWrapper = headers.querySelectorAll(".tabulator-col")

    columnsWrapper.forEach(_col => {
        _col.classList.toggle("table-header-col", true)
    })

    // ## Holder
    const bodyWrapper = document.querySelector(".tabulator-tableholder")

    bodyWrapper.classList.toggle("table-body-wrapper", true)

    // ## Container
    const bodyContainer = document.querySelector(".tabulator-table")

    bodyContainer.classList.toggle("table-body-container", true)

    // ## Row

    // - table-row
    // - - table-cell

    // ## Navigation
    const tableFooter = tableWrapper.querySelector(".tabulator-footer")

    tableFooter.classList.toggle("table-footer-wrapper", true)

    // ### Content
    const footerContent = tableFooter.querySelector(".tabulator-footer-contents")

    footerContent.classList.toggle("table-footer-content", true)

    // #### Info
    const footerInfo = footerContent.querySelector(".tabulator-page-counter")

    footerInfo.classList.toggle("table-footer-info", true)

    // #### Navigation
    const footerNavContent = footerContent.querySelector(".tabulator-paginator")

    footerNavContent.classList.toggle("table-footer-navigation-content", true)
})

window.onload = () => {
    table.setData(tableData)
}