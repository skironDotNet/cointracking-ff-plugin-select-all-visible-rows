# CoinTracking Row Selector

Adds a select-all checkbox to CoinTracking trades table.

## How to Use

### Idealy you would compile to xpi

#### Install web-ext:
`npm install --global web-ext`                                    

#### Run this to build and sign:
`web-ext sign --api-key=YOUR_AMO_KEY --api-secret=YOUR_AMO_SECRET`

This requires generating API keys from your AMO developer profile. Once signed, it will output a .xpi.

#### Notes:

* Mozilla **does not allow unsigned** `.xpi` installs anymore in standard Firefox (unless you use Developer Edition or turn on `xpinstall.signatures.required = false` in Firefox browser configuration setting)

* If you’re only using it for yourself, you don’t need to list it publicly

### Use as temporary plugin 

#### Step-by-step: Load extension temporarily in Firefox

##### Enable Developer Mode:

* Open Firefox
* Go to about:debugging in the address bar
* Click **“This Firefox”** (left side menu)     

##### Load the extension:

* Click `“Load Temporary Add-on…”`
* In the file picker, **select the** `manifest.json` **file** (not the folder)

##### That’s it — visit https://cointracking.info/enter_coins.php and test it