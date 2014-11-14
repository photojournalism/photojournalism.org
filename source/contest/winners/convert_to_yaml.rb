require 'yaml'

if (!ARGV[0])
  abort "You must pass in a year!"
end

year = ARGV[0].to_i

f = File.open("#{ARGV[0]}/index.html.erb", "r")

obj = { year: year, info: '' }
obj[:categories] = []

current_category = nil
category_count = -1

line_number = 0
f.each_line do |line|
  line_number += 1
  if (line.start_with? '</strong>')
    puts "File for #{year} is messed up on line #{line_number}"
  end
  if (line.start_with? "<p><strong>")
    current_category =  line
          .gsub(/\<\/?p\>/, '')
          .gsub(/\<\/?strong\>/, '')
          .gsub('<br>', '')
          .split(/(\W)/)
          .map(&:capitalize)
          .join
    obj[:categories] << { name: current_category, winners: [] }
    category_count += 1
  elsif (line.start_with?('<p>') && line.end_with?('<br>'))
    puts "#{year} has judges... extra formatting needed"
  elsif (line.start_with? '<p>HM')
    # Skip
  elsif (line.start_with? '<p>')
    obj[:info] = line.gsub(/\<\/?p\>/, '')
  elsif (line.start_with? '<%')
    # Skip
  elsif (line.start_with? '-')
    # Skip
  elsif (line[0] == line[0].downcase)
    # Skip
  else (line.match /^w/)
    winner_info = line.gsub(/\<\/?p\>/, '').gsub('<br>', '')
    obj[:categories][category_count][:winners] << { info: winner_info }
  end
end

f.close

yaml_file = File.new("#{year}/winners.yml", 'w')
yaml_file.write(obj.to_yaml)