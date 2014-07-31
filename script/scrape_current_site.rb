require "selenium-webdriver"

base_url = "http://photojournalism.org/contest/winners"

years = { 
  :'1975' => 'seventy-five',
  :'1976' => 'seventy-six',
  :'1977' => 'seventy-seven',
  :'1978' => 'seventy-eight',
  :'1979' => 'seventy-nine',
  :'1980' => 'eighty',
  :'1981' => 'eighty-one',
  :'1982' => 'eighty-two',
  :'1983' => 'eighty-three',
  :'1984' => 'eighty-four',
  :'1985' => 'eighty-five',
  :'1986' => 'eighty-six',
  :'1987' => 'eighty-seven',
  :'1988' => 'eighty-eight',
  :'1989' => 'eighty-nine',
  :'1990' => 'ninety',
  :'1991' => 'ninety-one',
  :'1992' => 'ninety-two',
  :'1993' => 'ninety-three',
  :'1994' => 'ninety-four',
  :'1995' => 'ninety-five',
  :'1996' => 'ninety-six',
  :'1997' => 'ninety-seven',
  :'1998' => 'ninety-eight',
  :'1999' => 'ninety-nine',
  :'2000' => 'zero',
  :'2001' => 'one',
  :'2002' => 'two',
  :'2003' => 'three',
  :'2004' => 'four',
  :'2005' => 'five',
  :'2006' => 'six',
  :'2007' => 'seven',
  :'2008' => 'eight',
  :'2009' => 'nine',
  :'2010' => 'ten',
  :'2011' => 'eleven',
  :'2012' => 'twelve',
  :'2013' => 'thirteen'
}

# New chrome driver
driver = Selenium::WebDriver.for :chrome

years.each do |k,v|
  year = k
  word = v
  driver.navigate.to "#{base_url}/#{word}/"
  
  html = driver.find_element(:css, ".entry-content").attribute("innerHTML")
  html = html
          .gsub('http://www.photojournalism.org/', '/') # Strip base url
          .gsub(word, "#{year}")                        # Sub word year for number year
          .gsub('&#8211;', '-')                         # Replace wordpress dash
          .strip                                        # Strip whitespace

  # Append HTML to new file
  `echo '#{html}' >> source/contest/winners/#{year}/index.html.erb`
end

driver.quit