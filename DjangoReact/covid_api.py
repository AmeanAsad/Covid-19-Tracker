#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Mar 17 17:17:26 2020

@author: ameanasad
"""

import json 
import requests
from geopy.geocoders import Nominatim

import numpy as np
import operator
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from rest_framework.response import Response







@api_view(["GET"])
@csrf_exempt
def get_covid_data(request):

    country_data= requests.get('https://coronavirus-19-api.herokuapp.com/countries')
    data = country_data.json()

    country_list = {}
    casesMax =  0
    todayCasesMax = 0
    deathsMax = 0
    todayDeathsMax = 0
    recoveredMax = 0

    for country_item in data:
        if country_item['country'] != 'World':
            if int(country_item['cases']) > casesMax:
                casesMax = country_item['cases']
            if int(country_item['todayCases']) > todayCasesMax:
                todayCasesMax = country_item['todayCases']
            if int(country_item['todayDeaths'])> todayDeathsMax:
                todayDeathsMax = country_item['todayDeaths']
            if country_item['recovered'] !=None: 
                if int(country_item['recovered'])> recoveredMax:
                    recoveredMax = country_item['recovered']
            name = country_item['country']
            country_list[name] = country_item
    
    country_list['casesMax'] = casesMax
    print(casesMax)
    country_list['todayCasesMax'] =todayCasesMax 
    country_list['deathsMax'] = deathsMax
    country_list['todayDeathsMax'] = todayDeathsMax
    country_list['recoveredMax'] = recoveredMax
    
    return  Response(country_list)




@api_view(["GET"])
@csrf_exempt
def get_covid_countries(request):

    country_data= requests.get('https://coronavirus-19-api.herokuapp.com/countries')
    data = country_data.json()

    return  Response(data)

@api_view(["GET"])
@csrf_exempt
def get_covid_covid_search_data(request):

    country_data= requests.get('https://coronavirus-19-api.herokuapp.com/countries')
    data = country_data.json()
    search_list = []
    for country in data:
        search_item = {}
        search_item['title'] = country['country']
        search_item['description']= "Cases: " + str(country['cases'])
        search_list.append(search_item)
    return  Response(search_list)


@api_view(["GET"])
@csrf_exempt
def get_covid_all(request):

    country_data= requests.get('https://coronavirus-19-api.herokuapp.com/all')
    data = country_data.json()

    return  Response(data)

@api_view(["POST"])
@csrf_exempt
def get_country_coordinates(request):
     if request.method == "POST":
        data = request.data
        country = data["country"]
        geolocator = Nominatim(user_agent="covid")
        location = geolocator.geocode(str(country))
        location_tuple = [location.latitude, location.longitude]
        
        return Response(location_tuple)
    
     return Response({"Message": "Response Failed"})


@api_view(["POST"])
@csrf_exempt
def get_country_data(request):
    if request.method == "POST":
        data = request.data
        country = data["country_name"]
        country_data= requests.get('https://coronavirus-19-api.herokuapp.com/countries/' + str(country))  
        return Response(country_data)
    
    return Response({"Message": "Response Failed"})
    

        


    
    

    
    
    
    






