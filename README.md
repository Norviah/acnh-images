## acnh-images

Downloads every image from the [Animal Crossing: New Horizons](https://docs.google.com/spreadsheets/d/1mo7myqHry5r_TKvakvIhHbcEAEQpSiNoNQoIS8sMpvM/edit#gid=1455827610) spreadsheet locally.

### Usage

To execute this module, you can install it globally:

```
npm install -g acnh-images
acnh-images
```

or, you can use `npx`:

```
npx acnh-images
```

By default, images will be saved under a sub-directory `images` in the current working directory. To provide a different directory, you can provide a format with the `-f` flag.

This flag represents how each image will be saved, and can contain any one of: `%s`, `%v`, `%f`, `%id`, `%uid`, and/or `[[key]]`. All instances of these terms will be replaced by a specific value of the item that the image represents:
  - `%s` represents the item's source sheet,
  - `%v` represents the item's variation,
  - `%f` represents the name of the png,
  - `%id` represents the item's internal ID, and
  - `%uid` represents the unique ID of the item.

`[[key]]` is special as whatever is in the brackets will be treated as a property of the item and will be replaced with the value the key represents. For example, if you want to get the personalities for villagers, you can do so by `[[personality]]`. The key `key` will be called on all items, and if the key doesn't exist in the item, an empty string will be used. To view all possible keys, take a look at the JSON files [here](https://github.com/Norviah/animal-crossing/tree/master/combined), as these are the data that `acnh-images` uses.

When manually setting the format, be sure that each image will be saved to a unique location, as variations of items can override other variations.

### Examples

```bash
# This format downloads every image in the desktop, under the sub-directory representing each item's Unique Entry ID.
acnh-items -f "~/Desktop/%s/%uid/%f.png"

# An example of this format being:
# · Desktop
#   · Construction
#     · [unique ID]
#       - Image.png
#     · etc.
#   · Fish
#     · [unique ID]
#       - Critterpedia Image.png
#       - Furniture Image.png
#       - Icon Image.png
#     · etc.
#   · etc.

# This format will simply download each image as it's unique ID.
acnh-items -f "~/Desktop/images/%uid.png"

# As for the example with [[key]], this format will save each villager in a sub-directory representing their personality.
acnh-items -f "./images/%s/[[personality]]/%n/%v/%f.png"
```
