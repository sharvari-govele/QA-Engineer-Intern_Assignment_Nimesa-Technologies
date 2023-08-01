import requests

url = f"https://samples.openweathermap.org/data/2.5/forecast/hourly?q=London,us&appid=b6907d289e10d714a6e88b30761fae22"

def get_weather(date):
    response = requests.get(url)
    data = response.json()
    for i in data["list"]:
        if i["dt_txt"].startswith(date):
            return i["main"]["temp"]

def get_wind_speed(date):
    response = requests.get(url)
    data = response.json()
    for i in data["list"]:
        if i["dt_txt"].startswith(date):
            return i["wind"]["speed"]


def get_pressure(date):
    response = requests.get(url)
    data = response.json()
    for i in data["list"]:
        if i["dt_txt"].startswith(date):
            return i["main"]["pressure"]

while True:
    print("\nselect 1 option from below:")
    print("1. Get weather")
    print("2. Get Wind Speed")
    print("3. Get Pressure")
    print("0. Exit")
    choice = input("Enter your choice: ")

    if choice == "1":
        date = input("Enter the date (YYYY-MM-DD): ")
        temp = get_weather(date)
        celsius = temp - 273.15
        print(f"The temperature on {date} is {temp}°K and {celsius:.2f}°C.")
    elif choice == "2":
        date = input("Enter the date (YYYY-MM-DD): ")
        wind_speed = get_wind_speed(date)
        print(f"The wind speed on {date} is {wind_speed} m/s.")
    elif choice == "3":
        date = input("Enter the date (YYYY-MM-DD): ")
        pressure = get_pressure(date)
        print(f"The pressure on {date} is {pressure} hPa.")
    elif choice == "0":
        print("Exiting the program.")
        break
    else:
        print("Select appropriate option")
