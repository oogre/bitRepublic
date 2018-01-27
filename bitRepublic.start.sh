echo "[+] Starting Meteor App!"
parent_file=$(pwd)
root_file=$parent_file/web.bitRepublic
cd $root_file


echo "[+] Setting environment variables"

export ADMIN_MAIL="admin@bitrepublic.be"
export ADMIN_PWD="bitrepublic123"

export USER_DEFAULT_PWD="hello123"

echo "[+] Starting Node Server"

meteor run