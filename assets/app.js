const timer = $("#current-day");
const timeblockContainer = $(".container");


// show the timer on page load
setInterval(function(){
    timer.text(moment().format("DD-MM-YYYY HH:mm:ss"));
}, 1000);

function createRow(time) {
    const row = $("<div>").attr("class", "row");

    const timeCol = $("<article>").attr("class", "col-2");
    const timeSpan = $("<span>").text(time + ":00");
    timeCol.append(timeSpan);

    row.append(timeCol);

    
    const timeNow = moment();
    // past rows load as grey
    const isPast = time < Number(timeNow.format("H"));
    // present row loads as green
    const isCurrent = time >= Number(timeNow.format("H")) && time <= ( Number(timeNow.format("H")) + 1);
    // future rows load as purple
    const isFuture = time > Number(timeNow.format('H'));

    let colorClass;

    if(isPast){
        colorClass = 'past'
    }
    if(isCurrent){
        colorClass = 'present'
    }
    if(isFuture){
        colorClass = 'future';
    }

    // if the row belongs to time present
    // give it (.present)

    // if the row belongs to time future
    // give it (.future)
    const textareaCol = $("<article>").attr("class", "col-8 " + colorClass );
    const textarea = $("<textarea>");

    // find existing saves in local storage
    // if exist then load content into textarea
    const existingNote = localStorage.getItem(time + ":00");

    if (existingNote) {
        textarea.val(existingNote);
    }

    textareaCol.append(textarea);

    row.append(textareaCol);

    const buttonCol = $("<article>").attr("class", "col-2");

    const button = $("<button>").attr("class", "btn btn-primary save-button");
    button.text("Save");
    buttonCol.append(button);
    row.append(buttonCol);

    return row;
}


// 24hour time - 9-5 work day
const times = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// generate all the timeblock rows
// each row
for (let index = 0; index < times.length; index++) {
    const time = times[index];
    const row = createRow(time);
    timeblockContainer.append(row);

}


// when the user clicks on save button
$(document).on("click", ".save-button", function (event) {
    // save content in the current row textarea to local storage
    // 1. grab the content of textarea
    const jButton = $(event.target);
    const jButtonCol = jButton.parent();

    const textarea = jButtonCol.prev().children();

    const userInput = textarea.val()

    // 2. use the time as the LS key
    const timeSpan = jButtonCol.prev().prev().children();
    const timeOfRow = timeSpan.text();

    // 3. save
    localStorage.setItem(timeOfRow, userInput);

    //when user clicks on reset all button
    $(document).on("click", "#reset-button", function (event){  
    //clear local storage
    localStorage.clear();
    window.location.reload();

});

});