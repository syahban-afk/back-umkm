@echo off
setlocal enabledelayedexpansion

REM List of filenames
set files=Customers Deliveries Discount_Categories Discounts Order_Details Orders Payments Product_Categories Product_Reviews Products Wishlists

for %%f in (%files%) do (
    mkdir %%f
    type nul > %%f\%%fController.js
)

echo Done!
