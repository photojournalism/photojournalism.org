#!/usr/bin/env ruby
require 'json'
require 'sanitize'

SRC_DIR   = 'source'
BUILD_DIR = 'build'
JSON_FILE = 'contents.json'

puts "Generating #{JSON_FILE}..."
class Sanitize
  module Config
    NONE = freeze_config(:elements => [])
  end
end

json = []

Dir.glob('./**/*.html') do |file|
  if (file.include?('index.html'))
    url = file.gsub("./#{BUILD_DIR}", '').gsub('index.html', '')
    contents = File.open(file, "rb").read
    page_title = contents[/\<title\>(.*)\<\/title\>/, 1].gsub(' &middot; Atlanta Photojournalism Seminar', '').force_encoding "utf-8"
    contents = contents
        .gsub(/\<h1\>.*\<\/h1\>/, '')          # Remove page title
        .gsub(/\<html\>.*\<\/header\>/m, '')   # Remove top part of document
        .gsub(/\<footer\>.*\<\/footer\>/m, '') # Remove footer
        .gsub(/\n/, '')                        # Remove newlines
        .gsub(/(function|var).*\;/, '')        # Remove Javascript
    contents = Sanitize.fragment(contents, Sanitize::Config::NONE).gsub(/\s{2,}/, ' ').strip.force_encoding "utf-8"
    object = { :page_title => page_title, :url => url, :contents => contents }
    json << object
  end
end

f = File.write("./#{SRC_DIR}/#{JSON_FILE}",   JSON.pretty_generate(json))
f = File.write("./#{BUILD_DIR}/#{JSON_FILE}", JSON.pretty_generate(json))