# data

This folder contains JSON data [in GeoJSON format](https://leafletjs.com/examples/geojson/), with coordinates and metadata on each Feature landmark to be displayed on the map.

Each category of landmark is given its own JSON file for ease of editing.

## data/i18n/ui

This folder contains JSON files which describe how the site should be translated for users. The website fetches the data from the appropriate JSON file as it loads.

Since the files in this folder are loaded dynamically, you can simply create a new JSON file, whose name is a 2-letter language code to provide the translations for, and the site will pick it up and use it. It will even fetch and display the appropriate flag, if available.

### Formatting

Formatting is done like so:

    {
      bread:"bread",
      butter:"butter",
      question:"I'd like {0} and {1}, or just {0}"
      ...
      login: 'login',
      onlyForMembers: 'You have to {0} in order to use our app',
      bold: 'bold',
      iAmText: 'I am {0} text',
      ...
      january: 'January',
      currentDate: 'The current date is {month} {day}, {year}!'
    }

In code, certain strings in brackets will be replaced with their intended values, like so:

    f('currentDate', {
      month: t('january'),
      day: 12,
      year: 2018
    });

### HTML Tags

Simple HTML can be for many translated strings. Only certain simple tags such as `<b>, <i>, <em>, and <a>` are allowed.

    {
      "contribute": "Click to learn <a href=\"https://github.com/GenshinMap/genshinmap.github.io/wiki/Contributing\">how to contribute.</a>",
    }

## data/features

Contains JSON data describing markers, with locations of features.

JSON files will be parsed and included in the map, and placed into the options pane based on region and category.

Note that `md` files will be ignored, so they can be used to provide notes as necessary.

### feature data format:

See `scripts/Documentation - MSFv2.md` for information on the file structure.

## data/changelog

This file contains the data used on the Changelog tab for the English language.
Don't feel obligated to update this quickly, as it receives additions with each update.
