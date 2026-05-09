#!/bin/bash
cd /portfolio/ApexInvestorGroup || {
        echo "Unable to change directories."
        exit 1
}

sudo docker-compose down || {
        echo "Unable to build and start body shop system container."
        exit 1
}

sudo git pull origin master || {
        echo "Unable to pull latest update."
        exit 1
}

cd /portfolio/ApexInvestorGroup/frontend || {
        echo "Unable to change directories."
        exit 1
}

npm run build || {
        echo "Build attempt failed."
        exit 1
}

sudo rm -rf build || {
        echo "No build folder to delete"
}

sudo mv dist build || {
        echo "Rename failed."
        exit 1
}

sudo rm -rf /portfolio/ApexInvestorGroup/backend/build || {
        echo "No build folder to delete"
}

mv build /portfolio/ApexInvestorGroup/backend/ || {
        echo "Unable to overwrite build folder."
        exit 1
}

cd /portfolio/ApexInvestorGroup || {
        echo "Unable to change directories."
        exit 1
}

sudo docker-compose up --build -d || {
        echo "Unable to build and start body shop system container."
        exit 1
}

echo "Apex Real Estate Website successfully built and deployed"
exit 1
