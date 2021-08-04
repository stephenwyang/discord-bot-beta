const axios = require('axios');
const cheerio = require('cheerio');

const dataTableID = "tabber-c5ab98ed60f590fb853f29967285ae47"
const getElement = require('@util/element-filter.js')

module.exports = async (url) => {
    axios.get(`${url}`).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        var charName = $(".char-name").text();
        var charTitle = $(".tooltip", ".char-title").children().remove().end().text();
        var charID = $('tr>td', ".tabbertab[title='Extra Data']").eq(0).text();
        console.log(`${charName} - ${charTitle}`);
        console.log(`ID: ${charID}`);
        var charRarity = $("a", ".char-rarity").eq(0).attr('title').split(" ")[0];
        //console.log(charRarity);
        var charEle = getElement($('tr>td', ".tabbertab[title='Stats']").eq(2).text());
        //console.log(charEle);

        // This is the code for extracting the Ougi/Charge Attack
        
        const ougiNames = [];
        const ougiDescript = [];
        var ougiIdx = -1;

        $(".table-container:eq(1)").each(function(i, elem) {
            $(".wikitable>tbody>tr",this).children().each(function (i, elem) {
                if(i > 3) {
                    //console.log(i);
                    if ( (i-1) % 3 === 0 ) {
                        ougiIdx += 1;
                    }
                    // Currently will remove all .tooltiptext values (Extra info), want to have a way to add it in a way thats
                    // less intrusive in the future
                    else if ( (i-2) % 3 === 0 ) {
                        $(this).find('br').before(' ');
                        ougiNames[ougiIdx] = $(this).text().trim()
                    }
                    else { 
                        //console.log($(".tooltip>tooltiptext", this).remove().end().text()) 
                        $(".tooltip", this).each( function (i, elem) {
                            $(".tooltiptext", this).remove()
                        })
                        $(this).find('br').before(' ');
                        ougiDescript[ougiIdx] = $(this).text().trim()
                    }
                }
            })
        })

        // This is strictly for testing purposes, will be commented out/removed
        // on full release
        // Printing out ougi: Names/Descriptions

        for (let i = 0; i < ougiNames.length; i++) {
            console.log(`${ougiNames[i]} - ${ougiDescript[i]}`)
        }


        //This is for getting the skill data
        //Might need to make new form for dual form characters, (specific cases)
        //For dual form charas, most of them have a .table-container length of 9
        //Might be able to make a filter for that

        const testV = $(".table-container").length
        var twoFormBool
        if (testV === 8) {
            twoFormBool = false
            console.log("This character has one skill set")
        }
        else if (testV === 9) {
            twoFormBool = true
            console.log("This character has two skill sets")
        }

        $(".table-container:eq(2)").each (function (i, elem) {
            $(".wikitable>tbody>tr", this).children().each( function (i, elem) {
                if (i === 0) {
                    //Saving skill-set name with i === 0
                    //Maybe have it as a separate branch
                    $(".tooltip", this).each( function (i, elem) {
                        $(".tooltiptext", this).remove()
                    })
                    console.log(i)
                    console.log($(this).text())
                }
                else if (i > 6) {
                    $(".tooltip", this).each( function (i, elem) {
                        $(".tooltiptext", this).remove()
                    })
                    /* $(this).find('br').before(' ');
                    console.log(i)
                    console.log($(this).text().trim()) */

                    // 8, 14, 20, 26 ... are all for skill names
                    // 9, 15, 21, 27 ... are all for skill cooldowns
                    // 10, 16, 22, 28 ... are all for skill (buff or debuffs) duration
                    // 11, 17, 23, 29 ... are for level obtained/upgrade
                    // 12, 18, 34, 30 ... are for skill effects
                    // 7, 13, 19, 25 ... are for skill icons

                    // Start to branch out to save the values

                }
                /*else if ( (i + 1) % 6 === 0 ) {
                    $(".tooltip", this).each( function (i, elem) {
                        $(".tooltiptext", this).remove()
                    })
                    $(this).find('br').before(' ');
                    console.log(i)
                    console.log($(this).text())
                } */ //Work on this later, good example to clean up some text
            })
        })

    })
    //error handling
    .catch(err => {
        console.log(err);
    });
}