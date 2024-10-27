import requests as rq
from bs4 import BeautifulSoup as bs
import json
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.parse import urlparse
import re

def scrape_devpost():
    all_urls = []
    url = "https://devpost.com/hackathons"
    driver = webdriver.Chrome()

    # Open the webpage
    driver.get(url)
    time.sleep(2)
    # Wait until an element is present (e.g., an element with id 'content')
    try:
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "results-and-filters")),
        )
        
        length_of_noted_hackathons = 0

        for _ in range(10):
            soup = bs(driver.page_source, 'html.parser')
            
            hackathons = soup.find_all(class_=re.compile(r'hackathon-tile'))
            

            for hackathon in hackathons[length_of_noted_hackathons:]:
                if not hackathon in all_urls:
                    all_urls.append(hackathon.find('a').get('href'))
            length_of_noted_hackathons = len(all_urls)

            driver.execute_script("window.scrollBy(0, 1000);")
        
            time.sleep(0.4)

    finally:
        driver.quit()
    
    with open("Sponsorship-Web-Scraper/sponsor_urls.txt", "w") as file:
        file.seek(0)
        text_urls = "\n".join(x for x in all_urls)
        file.write(text_urls)
        file.close()

def get_sponsor_information(all_sponsors):
    result = dict()
    for s in all_sponsors:
        sponsor = s.parent
        sponsor_url = sponsor.get('href')

        if sponsor_url == None:
             continue
        sponsor_url = urlparse(sponsor_url).netloc
        sponsor_name = s.get('alt')
        sponsor_img = s.get('src')
        result[sponsor_url] = {
            'name' : sponsor_name,
            'logo' : sponsor_img
        }
    return result

def get_hackathon_information(soup):
    '''
    returns
        date of hackathon 
        number of participants
        keywords
        Location or online
    '''

    result = dict()


    keywords = []
    keyword_elements = soup.find(id='challenge-information').find_all(class_='info')[-1].find_all(class_='label theme-label mr-1 mb-2')
    print()
    for keyword in keyword_elements:
        keywords.append(keyword.text.strip())

    print()
    try:
        result['location'] = soup.find(id='challenge-information').find_all(class_='info')[1].find(class_='info').text.strip()
        result['participant_number'] = int(soup.find(id='challenge-information').find_all(class_="info")[1].find_all('td')[3].find('strong').text)
    except:
        result['location'] = soup.find(id='challenge-information').find_all(class_='info')[2].find(class_='info').text.strip()
        result['participant_number'] = int(soup.find(id='challenge-information').find_all(class_="info")[2].find_all('tr')[1].find_all('td')[1].find('strong').text)

    result['keywords'] = keywords
    result['name'] = soup.find_all(class_ = "large-8 columns content")[0].find_all('h1')[0].text  
    return result

def scrape_individual_hackathon(url):
    '''
        This function will return data from the sponsorships and what types of hackathons the companies sponsor
    '''
    result = dict()
    response = rq.get(url)
    soup = bs(response.text, 'html.parser')
    # Potentially parse the url so it doesn't have any sub folders in url
    # E.g https://a.com rather than https://a.com/hello/123
    # This is because we will be using this as a key in the json dictionary
    all_sponsors = soup.find_all(class_='sponsor_logo_img')
    result['sponsors'] = get_sponsor_information(all_sponsors)
    result['hackathon'] = get_hackathon_information(soup)
    return result

    
def add_sponsors(data):
    # if sponsor already exists then get number of hackathons * avg_number_of_participants
    '''
        {
            "a.com":
                {
                    number_of_participants over all hackathons : 5000,
                    number_of_hackathons : 12,
                    name : "The A Company",
                    logo: "img_link"
                    keywords : ['beginner friendly', 'ai'] 
                }
        }
        Average number of participants can be inferred
    '''

    if not data:
        return
    
    with open("Sponsorship-Web-Scraper/sponsors.json", "r+") as file:
        all_sponsors = json.load(file)
        print(len(all_sponsors.keys()))
        for key in data["sponsors"].keys():
            if key in all_sponsors:
                 # perform calculations
                all_sponsors[key]['participants_num'] += data['hackathon']['participant_number']
                all_sponsors[key]['hackathon_num'] += 1
                all_sponsors[key]['keywords'].extend([elem for elem in data['hackathon']['keywords'] if elem not in all_sponsors[key]['keywords']])
                
                if not data['hackathon']['location'] in all_sponsors[key]['locations']:
                    all_sponsors[key]['locations'].append(data['hackathon']['location'])
            else: 
                all_sponsors[key] = dict()
                all_sponsors[key]['participants_num'] = data['hackathon']['participant_number']
                all_sponsors[key]['hackathon_num'] = 1
                all_sponsors[key]['name'] = data['sponsors'][key]['name']
                all_sponsors[key]['logo'] = data['sponsors'][key]['logo']
                all_sponsors[key]['keywords'] = data['hackathon']['keywords']
                all_sponsors[key]['locations'] = [data['hackathon']['location']]
                
        
        file.seek(0)
        json.dump(all_sponsors, file, indent=4)
    return 

def make_json_file_good():
    new_json = {"sponsors" : []}
    with open('src/web-scraper/sponsors.json', 'r') as file:
        old_json = json.load(file)
        for key in old_json.keys():
            new_json['sponsors'].append(old_json[key])
        file.close()
    print(new_json)
        

if __name__ == '__main__':
    #scrape_devpost()
    make_json_file_good()
    """ with open("Sponsorship-Web-Scraper/sponsor_urls.txt", 'r') as file:
        urls = file.read().split('\n')
        file.close()
    
    #urls.insert(0, "https://ingenium-stem-2.devpost.com/?ref_feature=challenge&ref_medium=discover")
    for url in urls[500:]:
        r = scrape_individual_hackathon(url)
        if  not r or not r['sponsors'] :
            continue
        add_sponsors(r) """
