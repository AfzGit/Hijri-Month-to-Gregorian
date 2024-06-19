const today = new Date();
var diff = 0;

const todayGregorian = today.toDateString();
var mag = "[after Magribh]";
var htmlResult = document.getElementById("result");
var color = "black";

document.getElementById("gregorian-date").textContent = todayGregorian;

// Function to convert Hijri date to Gregorian date
function hijriToGregorian(hijri, diff) {
    var hijriDiff = 1 - parseInt(hijri) + diff;

    for (let i = 1; i <= 30; i++) {
        var msg = "";
        color = "black";
        const dayonly = moment().add(hijriDiff, "days").format("dddd");

        if ((dayonly == "Monday") | (dayonly == "Thursday")) {
            msg += "🍎";
        }
        if ((i == 14) | (i == 15) | (i == 16)) {
            msg += "🍎";
        }
        if (dayonly == "Friday") {
            msg += "🕌";
        }
        if (i == hijri) {
            color = "red";
        }

        // 00
        let hijriDay = i.toString().padStart(2, "0");

        // 16 Jun | After Magribh | [Sunday]
        const thatday = moment()
            .add(hijriDiff, "days")
            .format("DD MMM" + "[ | After Magribh | ]" + "[[]dddd[]]");

        // printing
        htmlResult.innerHTML += `<li><font color="${color}"> ${hijriDay} Hijri -> ${thatday} ${msg}</font></li>`;

        // incrementing hijri
        hijriDiff++;
    }
}

document
    .getElementById("hijri-form")
    .addEventListener("submit", function (event) {
        // prevent refresh
        event.preventDefault();

        // reset calc result
        document.getElementById("result").innerHTML = "";

        // --- get inputs
        const currentHijriDate =
            document.getElementById("current-hijri-date").value;

        if (document.querySelector(".form-control").value == "yes") {
            diff = 0;
        } else {
            diff = -1;
        }
        console.log(diff);
        hijriToGregorian(currentHijriDate, diff);
    });
