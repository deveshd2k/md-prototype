-- Demo data (fictional people and agencies)

insert into public.users
  (full_name, email, agency, business_unit, department, location, job_title, time_lock)
values
  ('Amelia Hart', 'amelia.hart@bluepeakdigital.com', 'Bluepeak Digital', 'Technology', 'Engineering', 'Chicago', 'Front-end Developer', false),
  ('Rohan Mehta', 'rohan.mehta@harborandvine.com', 'Harbor & Vine', 'Operations', 'Finance', 'Toronto', 'Billing Coordinator', false),
  ('Sofia Alvarez', 'sofia.alvarez@meridianmg.com', 'Meridian Media Group', 'Operations', 'Finance', 'New York', 'Finance Manager', false),
  ('Daniel Okafor', 'daniel.okafor@northlightcreative.com', 'Northlight Creative', 'Technology', 'Engineering', 'Dubai', 'Software Engineer', false),
  ('Priya Nair', 'priya.nair@meridianmg.com', 'Meridian Media Group', 'Client Services', 'Account Management', 'Toronto', 'Account Director', false),
  ('Liam O''Connor', 'liam.oconnor@meridianmg.com', 'Meridian Media Group', 'Media', 'Media Planning', 'London', 'Senior Media Planner', false),
  ('Hannah Schmidt', 'hannah.schmidt@harborandvine.com', 'Harbor & Vine', 'Media', 'Media Buying', 'Chicago', 'Media Buyer', false),
  ('Kenji Tanaka', 'kenji.tanaka@fieldhousestudio.com', 'Fieldhouse Studio', 'Strategy', 'Insights & Analytics', 'Sydney', 'Insights Manager', true),
  ('Chloe Dubois', 'chloe.dubois@harborandvine.com', 'Harbor & Vine', 'Creative', 'Copywriting', 'Singapore', 'Copywriter', false),
  ('Marcus Reid', 'marcus.reid@bluepeakdigital.com', 'Bluepeak Digital', 'Strategy', 'Brand Strategy', 'Chicago', 'Senior Strategist', false),
  ('Aisha Rahman', 'aisha.rahman@fieldhousestudio.com', 'Fieldhouse Studio', 'Strategy', 'Brand Strategy', 'Singapore', 'Head of Strategy', true),
  ('Ethan Brooks', 'ethan.brooks@fieldhousestudio.com', 'Fieldhouse Studio', 'Operations', 'Finance', 'Sydney', 'Finance Manager', true),
  ('Isabella Rossi', 'isabella.rossi@bluepeakdigital.com', 'Bluepeak Digital', 'Creative', 'Copywriting', 'Sydney', 'Senior Copywriter', false),
  ('Noah Fischer', 'noah.fischer@harborandvine.com', 'Harbor & Vine', 'Operations', 'People & Talent', 'Chicago', 'Talent Acquisition Partner', false),
  ('Maya Patel', 'maya.patel@meridianmg.com', 'Meridian Media Group', 'Creative', 'Design', 'Dubai', 'Design Director', false),
  ('Oliver Grant', 'oliver.grant@bluepeakdigital.com', 'Bluepeak Digital', 'Creative', 'Design', 'Berlin', 'Senior Designer', false),
  ('Zara Khan', 'zara.khan@bluepeakdigital.com', 'Bluepeak Digital', 'Technology', 'IT Operations', 'Chicago', 'Systems Administrator', false),
  ('Lucas Moreau', 'lucas.moreau@meridianmg.com', 'Meridian Media Group', 'Media', 'Media Buying', 'New York', 'Programmatic Trader', true),
  ('Grace Liu', 'grace.liu@fieldhousestudio.com', 'Fieldhouse Studio', 'Operations', 'Finance', 'London', 'Finance Manager', false),
  ('Samuel Adeyemi', 'samuel.adeyemi@bluepeakdigital.com', 'Bluepeak Digital', 'Client Services', 'Project Management', 'Berlin', 'Senior Project Manager', true),
  ('Emily Carter', 'emily.carter@meridianmg.com', 'Meridian Media Group', 'Media', 'Media Planning', 'Dubai', 'Senior Media Planner', false),
  ('Arjun Kapoor', 'arjun.kapoor@bluepeakdigital.com', 'Bluepeak Digital', 'Creative', 'Design', 'Chicago', 'Art Director', false),
  ('Freya Lindqvist', 'freya.lindqvist@bluepeakdigital.com', 'Bluepeak Digital', 'Strategy', 'Brand Strategy', 'New York', 'Strategist', true),
  ('Jacob Nguyen', 'jacob.nguyen@northlightcreative.com', 'Northlight Creative', 'Strategy', 'Brand Strategy', 'Dubai', 'Head of Strategy', false),
  ('Leila Haddad', 'leila.haddad@northlightcreative.com', 'Northlight Creative', 'Strategy', 'Insights & Analytics', 'Toronto', 'Insights Manager', true),
  ('Thomas Walsh', 'thomas.walsh@northlightcreative.com', 'Northlight Creative', 'Strategy', 'Brand Strategy', 'Dubai', 'Head of Strategy', false),
  ('Nina Kowalski', 'nina.kowalski@fieldhousestudio.com', 'Fieldhouse Studio', 'Operations', 'People & Talent', 'Dubai', 'Talent Acquisition Partner', false),
  ('Mateo Fernandez', 'mateo.fernandez@bluepeakdigital.com', 'Bluepeak Digital', 'Operations', 'People & Talent', 'Toronto', 'Talent Acquisition Partner', false),
  ('Ava Thompson', 'ava.thompson@meridianmg.com', 'Meridian Media Group', 'Creative', 'Design', 'Dubai', 'Art Director', true),
  ('Hiroshi Sato', 'hiroshi.sato@meridianmg.com', 'Meridian Media Group', 'Media', 'Media Planning', 'Sydney', 'Media Planner', true),
  ('Olivia Bennett', 'olivia.bennett@fieldhousestudio.com', 'Fieldhouse Studio', 'Technology', 'Engineering', 'Chicago', 'Software Engineer', false),
  ('Karan Singh', 'karan.singh@harborandvine.com', 'Harbor & Vine', 'Client Services', 'Project Management', 'Dubai', 'Producer', false),
  ('Elena Petrova', 'elena.petrova@harborandvine.com', 'Harbor & Vine', 'Creative', 'Design', 'Chicago', 'Art Director', false),
  ('James Mitchell', 'james.mitchell@northlightcreative.com', 'Northlight Creative', 'Strategy', 'Insights & Analytics', 'Chicago', 'Insights Manager', false),
  ('Mei Chen', 'mei.chen@meridianmg.com', 'Meridian Media Group', 'Media', 'Media Planning', 'Sydney', 'Senior Media Planner', false),
  ('Omar Farouk', 'omar.farouk@northlightcreative.com', 'Northlight Creative', 'Strategy', 'Insights & Analytics', 'Singapore', 'Insights Manager', false),
  ('Charlotte Evans', 'charlotte.evans@harborandvine.com', 'Harbor & Vine', 'Technology', 'IT Operations', 'Singapore', 'Systems Administrator', true),
  ('Diego Ramirez', 'diego.ramirez@bluepeakdigital.com', 'Bluepeak Digital', 'Client Services', 'Project Management', 'Berlin', 'Senior Project Manager', false),
  ('Sarah Cohen', 'sarah.cohen@harborandvine.com', 'Harbor & Vine', 'Creative', 'Design', 'Sydney', 'Art Director', false),
  ('Benjamin Clarke', 'benjamin.clarke@fieldhousestudio.com', 'Fieldhouse Studio', 'Creative', 'Copywriting', 'Chicago', 'Copywriter', false);

-- Organisation-wide directory: 100 fictional people not yet in public.users

insert into public.org_users
  (full_name, email, agency, business_unit, department, location, job_title)
values
  ('Yara Holm', 'yara.holm@fieldhousestudio.com', 'Fieldhouse Studio', 'Creative', 'Design', 'Berlin', 'Senior Designer'),
  ('Yusuf Moreno', 'yusuf.moreno@meridianmg.com', 'Meridian Media Group', 'Media', 'Media Planning', 'Dubai', 'Senior Media Planner'),
  ('Umar Gallagher', 'umar.gallagher@bluepeakdigital.com', 'Bluepeak Digital', 'Media', 'Media Buying', 'New York', 'Media Buyer'),
  ('Lucia Zhang', 'lucia.zhang@northlightcreative.com', 'Northlight Creative', 'Technology', 'Engineering', 'Chicago', 'Front-end Developer'),
  ('Rania Dimitriou', 'rania.dimitriou@harborandvine.com', 'Harbor & Vine', 'Media', 'Media Planning', 'Dubai', 'Senior Media Planner'),
  ('Helena Brennan', 'helena.brennan@harborandvine.com', 'Harbor & Vine', 'Strategy', 'Brand Strategy', 'Singapore', 'Senior Strategist'),
  ('Beatriz Yilmaz', 'beatriz.yilmaz@harborandvine.com', 'Harbor & Vine', 'Technology', 'Engineering', 'New York', 'Software Engineer'),
  ('Stefan Sato', 'stefan.sato@meridianmg.com', 'Meridian Media Group', 'Operations', 'People & Talent', 'Chicago', 'HR Business Partner'),
  ('Kofi Esposito', 'kofi.esposito@meridianmg.com', 'Meridian Media Group', 'Client Services', 'Account Management', 'London', 'Account Director'),
  ('Tara Iyer', 'tara.iyer@meridianmg.com', 'Meridian Media Group', 'Creative', 'Copywriting', 'Berlin', 'Senior Copywriter'),
  ('Quentin Zhang', 'quentin.zhang@bluepeakdigital.com', 'Bluepeak Digital', 'Strategy', 'Insights & Analytics', 'Singapore', 'Insights Manager'),
  ('Cyrus Mensah', 'cyrus.mensah@meridianmg.com', 'Meridian Media Group', 'Technology', 'Engineering', 'London', 'Software Engineer'),
  ('Helena Rossetti', 'helena.rossetti@meridianmg.com', 'Meridian Media Group', 'Creative', 'Design', 'London', 'Junior Designer'),
  ('Lucia Kowalczyk', 'lucia.kowalczyk@harborandvine.com', 'Harbor & Vine', 'Client Services', 'Project Management', 'Berlin', 'Producer'),
  ('Owen Ueda', 'owen.ueda@meridianmg.com', 'Meridian Media Group', 'Strategy', 'Brand Strategy', 'Berlin', 'Head of Strategy'),
  ('Helena Lam', 'helena.lam@fieldhousestudio.com', 'Fieldhouse Studio', 'Media', 'Media Planning', 'Berlin', 'Media Planner'),
  ('Elias Moreno', 'elias.moreno@harborandvine.com', 'Harbor & Vine', 'Creative', 'Copywriting', 'Chicago', 'Creative Director'),
  ('Yusuf Holm', 'yusuf.holm@fieldhousestudio.com', 'Fieldhouse Studio', 'Operations', 'People & Talent', 'London', 'HR Business Partner'),
  ('Tobias Ueda', 'tobias.ueda@bluepeakdigital.com', 'Bluepeak Digital', 'Client Services', 'Project Management', 'Dubai', 'Producer'),
  ('Uma Osei', 'uma.osei@bluepeakdigital.com', 'Bluepeak Digital', 'Strategy', 'Brand Strategy', 'Sydney', 'Senior Strategist'),
  ('Bianca Andersson', 'bianca.andersson@northlightcreative.com', 'Northlight Creative', 'Creative', 'Design', 'Dubai', 'Junior Designer'),
  ('Yusuf Petrov', 'yusuf.petrov@meridianmg.com', 'Meridian Media Group', 'Client Services', 'Project Management', 'Dubai', 'Senior Project Manager'),
  ('Gustavo Ibarra', 'gustavo.ibarra@meridianmg.com', 'Meridian Media Group', 'Strategy', 'Insights & Analytics', 'Singapore', 'Data Analyst'),
  ('William Govender', 'william.govender@bluepeakdigital.com', 'Bluepeak Digital', 'Technology', 'IT Operations', 'Toronto', 'IT Support Specialist'),
  ('Elias Yilmaz', 'elias.yilmaz@fieldhousestudio.com', 'Fieldhouse Studio', 'Technology', 'Engineering', 'Dubai', 'Engineering Manager'),
  ('Wen Fraser', 'wen.fraser@bluepeakdigital.com', 'Bluepeak Digital', 'Creative', 'Design', 'Singapore', 'Design Director'),
  ('Rania Nakamura', 'rania.nakamura@northlightcreative.com', 'Northlight Creative', 'Technology', 'Engineering', 'Berlin', 'Front-end Developer'),
  ('Umar Tan', 'umar.tan@harborandvine.com', 'Harbor & Vine', 'Operations', 'People & Talent', 'London', 'Talent Acquisition Partner'),
  ('Pia Fraser', 'pia.fraser@northlightcreative.com', 'Northlight Creative', 'Media', 'Media Buying', 'Singapore', 'Programmatic Trader'),
  ('Umar Wright', 'umar.wright@fieldhousestudio.com', 'Fieldhouse Studio', 'Creative', 'Copywriting', 'Chicago', 'Creative Director'),
  ('Emeka Park', 'emeka.park@northlightcreative.com', 'Northlight Creative', 'Creative', 'Copywriting', 'Sydney', 'Senior Copywriter'),
  ('Quentin Ibarra', 'quentin.ibarra@harborandvine.com', 'Harbor & Vine', 'Creative', 'Design', 'Toronto', 'Senior Designer'),
  ('Tobias Takahashi', 'tobias.takahashi@bluepeakdigital.com', 'Bluepeak Digital', 'Media', 'Media Buying', 'Singapore', 'Programmatic Trader'),
  ('Gustavo Barros', 'gustavo.barros@bluepeakdigital.com', 'Bluepeak Digital', 'Media', 'Media Buying', 'Chicago', 'Programmatic Trader'),
  ('Zoe Osei', 'zoe.osei@harborandvine.com', 'Harbor & Vine', 'Technology', 'IT Operations', 'Berlin', 'IT Support Specialist'),
  ('Mohammed Andersson', 'mohammed.andersson@bluepeakdigital.com', 'Bluepeak Digital', 'Strategy', 'Insights & Analytics', 'Singapore', 'Insights Manager'),
  ('Anton Iyer', 'anton.iyer@fieldhousestudio.com', 'Fieldhouse Studio', 'Technology', 'Engineering', 'Singapore', 'Front-end Developer'),
  ('Helena Osei', 'helena.osei@harborandvine.com', 'Harbor & Vine', 'Technology', 'Engineering', 'Toronto', 'Front-end Developer'),
  ('Callum Varga', 'callum.varga@harborandvine.com', 'Harbor & Vine', 'Operations', 'People & Talent', 'Chicago', 'Talent Acquisition Partner'),
  ('Paloma Govender', 'paloma.govender@meridianmg.com', 'Meridian Media Group', 'Strategy', 'Brand Strategy', 'Toronto', 'Strategist'),
  ('Yusuf Iyer', 'yusuf.iyer@meridianmg.com', 'Meridian Media Group', 'Operations', 'Finance', 'Toronto', 'Financial Analyst'),
  ('Tara Mensah', 'tara.mensah@fieldhousestudio.com', 'Fieldhouse Studio', 'Client Services', 'Account Management', 'Toronto', 'Account Director'),
  ('Beatriz Castillo', 'beatriz.castillo@fieldhousestudio.com', 'Fieldhouse Studio', 'Media', 'Media Planning', 'Singapore', 'Media Planner'),
  ('Callum Takahashi', 'callum.takahashi@fieldhousestudio.com', 'Fieldhouse Studio', 'Technology', 'IT Operations', 'Chicago', 'Systems Administrator'),
  ('Gustavo Eriksen', 'gustavo.eriksen@bluepeakdigital.com', 'Bluepeak Digital', 'Client Services', 'Project Management', 'Chicago', 'Project Manager'),
  ('Cyrus Eriksen', 'cyrus.eriksen@harborandvine.com', 'Harbor & Vine', 'Technology', 'Engineering', 'Chicago', 'Engineering Manager'),
  ('Lucia Quinn', 'lucia.quinn@northlightcreative.com', 'Northlight Creative', 'Operations', 'People & Talent', 'Chicago', 'Talent Acquisition Partner'),
  ('Cyrus Holm', 'cyrus.holm@harborandvine.com', 'Harbor & Vine', 'Operations', 'People & Talent', 'Dubai', 'Talent Acquisition Partner'),
  ('Wen Ibarra', 'wen.ibarra@bluepeakdigital.com', 'Bluepeak Digital', 'Technology', 'Engineering', 'Sydney', 'Software Engineer'),
  ('Quentin Gallagher', 'quentin.gallagher@bluepeakdigital.com', 'Bluepeak Digital', 'Strategy', 'Insights & Analytics', 'Toronto', 'Insights Manager'),
  ('Tobias Tan', 'tobias.tan@harborandvine.com', 'Harbor & Vine', 'Client Services', 'Project Management', 'New York', 'Senior Project Manager'),
  ('Fatima Vasquez', 'fatima.vasquez@meridianmg.com', 'Meridian Media Group', 'Strategy', 'Brand Strategy', 'London', 'Strategist'),
  ('Bianca Kowalczyk', 'bianca.kowalczyk@northlightcreative.com', 'Northlight Creative', 'Operations', 'Finance', 'London', 'Finance Manager'),
  ('Lucia Kaur', 'lucia.kaur@harborandvine.com', 'Harbor & Vine', 'Creative', 'Design', 'Singapore', 'Senior Designer'),
  ('Dalia Nakamura', 'dalia.nakamura@northlightcreative.com', 'Northlight Creative', 'Technology', 'Engineering', 'Dubai', 'Front-end Developer'),
  ('Owen Andersson', 'owen.andersson@bluepeakdigital.com', 'Bluepeak Digital', 'Technology', 'IT Operations', 'Berlin', 'Systems Administrator'),
  ('Valeria Kowalczyk', 'valeria.kowalczyk@northlightcreative.com', 'Northlight Creative', 'Operations', 'Finance', 'Chicago', 'Billing Coordinator'),
  ('Hana Hosseini', 'hana.hosseini@meridianmg.com', 'Meridian Media Group', 'Creative', 'Design', 'Chicago', 'Senior Designer'),
  ('Fatima Holm', 'fatima.holm@meridianmg.com', 'Meridian Media Group', 'Creative', 'Design', 'New York', 'Design Director'),
  ('Zain Fraser', 'zain.fraser@fieldhousestudio.com', 'Fieldhouse Studio', 'Media', 'Media Buying', 'Sydney', 'Programmatic Trader'),
  ('Elias Ibarra', 'elias.ibarra@harborandvine.com', 'Harbor & Vine', 'Media', 'Media Buying', 'Sydney', 'Programmatic Trader'),
  ('Beatriz Xu', 'beatriz.xu@meridianmg.com', 'Meridian Media Group', 'Client Services', 'Project Management', 'Dubai', 'Senior Project Manager'),
  ('William Quinn', 'william.quinn@bluepeakdigital.com', 'Bluepeak Digital', 'Media', 'Media Planning', 'Dubai', 'Media Planner'),
  ('Zain Park', 'zain.park@northlightcreative.com', 'Northlight Creative', 'Strategy', 'Insights & Analytics', 'London', 'Data Analyst'),
  ('Paloma Delgado', 'paloma.delgado@meridianmg.com', 'Meridian Media Group', 'Media', 'Media Buying', 'Singapore', 'Media Buyer'),
  ('Kofi Ueda', 'kofi.ueda@harborandvine.com', 'Harbor & Vine', 'Media', 'Media Planning', 'New York', 'Media Planner'),
  ('Gabriel Chowdhury', 'gabriel.chowdhury@northlightcreative.com', 'Northlight Creative', 'Client Services', 'Account Management', 'Sydney', 'Account Executive'),
  ('Adrian Jovanovic', 'adrian.jovanovic@northlightcreative.com', 'Northlight Creative', 'Operations', 'Finance', 'Berlin', 'Finance Manager'),
  ('Tara Xu', 'tara.xu@meridianmg.com', 'Meridian Media Group', 'Technology', 'IT Operations', 'Chicago', 'Systems Administrator'),
  ('Tara Vasquez', 'tara.vasquez@harborandvine.com', 'Harbor & Vine', 'Strategy', 'Brand Strategy', 'Sydney', 'Head of Strategy'),
  ('Ximena Park', 'ximena.park@northlightcreative.com', 'Northlight Creative', 'Operations', 'People & Talent', 'Dubai', 'HR Business Partner'),
  ('Tara Quinn', 'tara.quinn@northlightcreative.com', 'Northlight Creative', 'Creative', 'Design', 'Chicago', 'Senior Designer'),
  ('Anton Lam', 'anton.lam@harborandvine.com', 'Harbor & Vine', 'Strategy', 'Brand Strategy', 'Toronto', 'Head of Strategy'),
  ('Zoe Jensen', 'zoe.jensen@northlightcreative.com', 'Northlight Creative', 'Media', 'Media Buying', 'Singapore', 'Programmatic Trader'),
  ('Yara Takahashi', 'yara.takahashi@bluepeakdigital.com', 'Bluepeak Digital', 'Client Services', 'Account Management', 'Chicago', 'Account Director'),
  ('Ivan Castillo', 'ivan.castillo@bluepeakdigital.com', 'Bluepeak Digital', 'Media', 'Media Buying', 'Singapore', 'Media Buyer'),
  ('Oscar Castillo', 'oscar.castillo@harborandvine.com', 'Harbor & Vine', 'Strategy', 'Brand Strategy', 'London', 'Senior Strategist'),
  ('Adrian Mensah', 'adrian.mensah@fieldhousestudio.com', 'Fieldhouse Studio', 'Creative', 'Design', 'Berlin', 'Junior Designer'),
  ('Naomi Ramos', 'naomi.ramos@harborandvine.com', 'Harbor & Vine', 'Technology', 'Engineering', 'London', 'Front-end Developer'),
  ('William Jovanovic', 'william.jovanovic@meridianmg.com', 'Meridian Media Group', 'Strategy', 'Brand Strategy', 'London', 'Head of Strategy'),
  ('Beatriz Takahashi', 'beatriz.takahashi@harborandvine.com', 'Harbor & Vine', 'Client Services', 'Account Management', 'Toronto', 'Account Manager'),
  ('Paloma Whitfield', 'paloma.whitfield@bluepeakdigital.com', 'Bluepeak Digital', 'Client Services', 'Project Management', 'Chicago', 'Project Manager'),
  ('Ximena Chowdhury', 'ximena.chowdhury@northlightcreative.com', 'Northlight Creative', 'Media', 'Media Planning', 'Berlin', 'Senior Media Planner'),
  ('Hana Tan', 'hana.tan@northlightcreative.com', 'Northlight Creative', 'Technology', 'IT Operations', 'Toronto', 'IT Support Specialist'),
  ('Ximena Young', 'ximena.young@harborandvine.com', 'Harbor & Vine', 'Creative', 'Design', 'Dubai', 'Design Director'),
  ('Gustavo Uribe', 'gustavo.uribe@bluepeakdigital.com', 'Bluepeak Digital', 'Operations', 'People & Talent', 'Singapore', 'Talent Acquisition Partner'),
  ('Stefan Yilmaz', 'stefan.yilmaz@northlightcreative.com', 'Northlight Creative', 'Creative', 'Copywriting', 'New York', 'Senior Copywriter'),
  ('Paloma Rossetti', 'paloma.rossetti@bluepeakdigital.com', 'Bluepeak Digital', 'Operations', 'People & Talent', 'Berlin', 'HR Business Partner'),
  ('Zain Barros', 'zain.barros@harborandvine.com', 'Harbor & Vine', 'Media', 'Media Buying', 'Berlin', 'Media Buyer'),
  ('Kai Varga', 'kai.varga@fieldhousestudio.com', 'Fieldhouse Studio', 'Operations', 'Finance', 'Dubai', 'Billing Coordinator'),
  ('Ximena Esposito', 'ximena.esposito@harborandvine.com', 'Harbor & Vine', 'Media', 'Media Buying', 'Chicago', 'Media Buyer'),
  ('Oscar Park', 'oscar.park@harborandvine.com', 'Harbor & Vine', 'Client Services', 'Account Management', 'London', 'Account Director'),
  ('Fatima Nakamura', 'fatima.nakamura@harborandvine.com', 'Harbor & Vine', 'Technology', 'Engineering', 'Toronto', 'Software Engineer'),
  ('Wen Iyer', 'wen.iyer@northlightcreative.com', 'Northlight Creative', 'Media', 'Media Buying', 'Chicago', 'Media Buyer'),
  ('Wen Kaur', 'wen.kaur@northlightcreative.com', 'Northlight Creative', 'Client Services', 'Project Management', 'London', 'Senior Project Manager'),
  ('Dalia Abara', 'dalia.abara@bluepeakdigital.com', 'Bluepeak Digital', 'Technology', 'IT Operations', 'New York', 'IT Support Specialist'),
  ('Sana Quinn', 'sana.quinn@northlightcreative.com', 'Northlight Creative', 'Creative', 'Copywriting', 'New York', 'Creative Director'),
  ('Owen Lam', 'owen.lam@meridianmg.com', 'Meridian Media Group', 'Strategy', 'Insights & Analytics', 'New York', 'Data Analyst'),
  ('Mohammed Chowdhury', 'mohammed.chowdhury@northlightcreative.com', 'Northlight Creative', 'Media', 'Media Planning', 'Berlin', 'Media Planner'),
  ('Kai Tan', 'kai.tan@meridianmg.com', 'Meridian Media Group', 'Creative', 'Copywriting', 'Chicago', 'Senior Copywriter');

-- Permission roles, access scope types and scope options

insert into public.roles (name, description, sort_order)
values
  ('Cost Rate Reviewer', 'View cost rates for roles to support pricing and financial review', 1),
  ('Finance Lead', 'View and monitor financial performance, including cost, revenue, and key metrics', 2),
  ('Pricing Lead', 'Create, update, and manage pricing estimates for projects', 3),
  ('Project Manager', 'Create, manage, and oversee projects within the assigned scope', 4),
  ('Resource Manager', 'Allocate resources to projects and manage capacity and utilisation', 5),
  ('Report Reader', 'Ability to run timesheet reports', 6);

insert into public.scope_options (list, value, parent_list, parent_value, sort_order)
values
  ('region', 'APAC', null, null, 1),
  ('region', 'EMEA', null, null, 2),
  ('region', 'LATAM', null, null, 3),
  ('region', 'NA', null, null, 4),
  ('client', 'Procter & Gamble', null, null, 1),
  ('client', 'Shell', null, null, 2),
  ('client', 'The Coca-Cola Company', null, null, 3),
  ('client', 'Unilever', null, null, 4),
  ('country', 'United States', 'region', 'NA', 1),
  ('country', 'China', 'region', 'APAC', 2),
  ('country', 'Germany', 'region', 'EMEA', 3),
  ('country', 'India', 'region', 'APAC', 4),
  ('country', 'Japan', 'region', 'APAC', 5),
  ('country', 'United Kingdom', 'region', 'EMEA', 6),
  ('country', 'France', 'region', 'EMEA', 7),
  ('country', 'Italy', 'region', 'EMEA', 8),
  ('country', 'Canada', 'region', 'NA', 9),
  ('country', 'Brazil', 'region', 'LATAM', 10),
  ('brand', 'Pampers', 'client', 'Procter & Gamble', 1),
  ('brand', 'Tide', 'client', 'Procter & Gamble', 2),
  ('brand', 'Ariel', 'client', 'Procter & Gamble', 3),
  ('brand', 'Gillette', 'client', 'Procter & Gamble', 4),
  ('brand', 'Oral-B', 'client', 'Procter & Gamble', 5),
  ('brand', 'Head & Shoulders', 'client', 'Procter & Gamble', 6),
  ('brand', 'Pantene', 'client', 'Procter & Gamble', 7),
  ('brand', 'Olay', 'client', 'Procter & Gamble', 8),
  ('brand', 'Always', 'client', 'Procter & Gamble', 9),
  ('brand', 'Downy', 'client', 'Procter & Gamble', 10),
  ('brand', 'Febreze', 'client', 'Procter & Gamble', 11),
  ('brand', 'Charmin', 'client', 'Procter & Gamble', 12),
  ('brand', 'Bounty', 'client', 'Procter & Gamble', 13),
  ('brand', 'Dawn', 'client', 'Procter & Gamble', 14),
  ('brand', 'Vicks', 'client', 'Procter & Gamble', 15),
  ('brand', 'Shell V-Power', 'client', 'Shell', 16),
  ('brand', 'Shell Helix', 'client', 'Shell', 17),
  ('brand', 'Shell Rimula', 'client', 'Shell', 18),
  ('brand', 'Shell Recharge', 'client', 'Shell', 19),
  ('brand', 'Shell Select', 'client', 'Shell', 20),
  ('brand', 'Pennzoil', 'client', 'Shell', 21),
  ('brand', 'Quaker State', 'client', 'Shell', 22),
  ('brand', 'Jiffy Lube', 'client', 'Shell', 23),
  ('brand', 'Coca-Cola', 'client', 'The Coca-Cola Company', 24),
  ('brand', 'Coca-Cola Zero Sugar', 'client', 'The Coca-Cola Company', 25),
  ('brand', 'Diet Coke', 'client', 'The Coca-Cola Company', 26),
  ('brand', 'Sprite', 'client', 'The Coca-Cola Company', 27),
  ('brand', 'Fanta', 'client', 'The Coca-Cola Company', 28),
  ('brand', 'Minute Maid', 'client', 'The Coca-Cola Company', 29),
  ('brand', 'Powerade', 'client', 'The Coca-Cola Company', 30),
  ('brand', 'smartwater', 'client', 'The Coca-Cola Company', 31),
  ('brand', 'Dasani', 'client', 'The Coca-Cola Company', 32),
  ('brand', 'Fuze Tea', 'client', 'The Coca-Cola Company', 33),
  ('brand', 'Costa Coffee', 'client', 'The Coca-Cola Company', 34),
  ('brand', 'Topo Chico', 'client', 'The Coca-Cola Company', 35),
  ('brand', 'vitaminwater', 'client', 'The Coca-Cola Company', 36),
  ('brand', 'BODYARMOR', 'client', 'The Coca-Cola Company', 37),
  ('brand', 'Dove', 'client', 'Unilever', 38),
  ('brand', 'Axe', 'client', 'Unilever', 39),
  ('brand', 'Rexona', 'client', 'Unilever', 40),
  ('brand', 'Vaseline', 'client', 'Unilever', 41),
  ('brand', 'Hellmann''s', 'client', 'Unilever', 42),
  ('brand', 'Knorr', 'client', 'Unilever', 43),
  ('brand', 'Sunsilk', 'client', 'Unilever', 44),
  ('brand', 'TRESemmé', 'client', 'Unilever', 45),
  ('brand', 'OMO', 'client', 'Unilever', 46),
  ('brand', 'Comfort', 'client', 'Unilever', 47),
  ('brand', 'Domestos', 'client', 'Unilever', 48),
  ('brand', 'Cif', 'client', 'Unilever', 49),
  ('brand', 'Lifebuoy', 'client', 'Unilever', 50);

insert into public.scope_types (key, label, description, level, option_list, filtered_by, sort_order)
values
  ('agency', 'Agency', 'Limit access by agency', 'organisation', 'agency', null, 1),
  ('agency_region', 'Agency Region', 'Limit access by agency region', 'organisation', 'region', null, 2),
  ('agency_country', 'Agency Country', 'Limit access by agency country', 'organisation', 'country', 'agency_region', 3),
  ('client', 'Client', 'Limit access by client', 'client_brand', 'client', null, 4),
  ('brand', 'Brand', 'Limit access by brand', 'client_brand', 'brand', 'client', 5),
  ('campaign_region', 'Campaign Region', 'Limit access by campaign region', 'client_brand', 'region', null, 6),
  ('campaign_country', 'Campaign Country', 'Limit access by campaign country', 'client_brand', 'country', 'campaign_region', 7);

-- Sample role assignments for existing users
select public.set_user_role(
  (select id from public.users where email = 'amelia.hart@bluepeakdigital.com'),
  (select id from public.roles where name = 'Pricing Lead'),
  '{"client": ["Unilever", "Shell"], "campaign_region": ["EMEA"]}'
);
select public.set_user_role(
  (select id from public.users where email = 'amelia.hart@bluepeakdigital.com'),
  (select id from public.roles where name = 'Report Reader'),
  '{"agency": ["Bluepeak Digital"]}'
);
select public.set_user_role(
  (select id from public.users where email = 'rohan.mehta@harborandvine.com'),
  (select id from public.roles where name = 'Finance Lead'),
  '{"agency": ["Harbor & Vine"], "agency_region": ["NA"], "agency_country": ["Canada", "United States"]}'
);
select public.set_user_role(
  (select id from public.users where email = 'sofia.alvarez@meridianmg.com'),
  (select id from public.roles where name = 'Project Manager'),
  '{"client": ["The Coca-Cola Company"], "brand": ["Coca-Cola", "Sprite", "Fanta"], "campaign_country": ["Brazil"]}'
);
select public.set_user_role(
  (select id from public.users where email = 'daniel.okafor@northlightcreative.com'),
  (select id from public.roles where name = 'Resource Manager'),
  '{"agency": ["Northlight Creative"], "agency_region": ["EMEA"]}'
);
select public.set_user_role(
  (select id from public.users where email = 'priya.nair@meridianmg.com'),
  (select id from public.roles where name = 'Cost Rate Reviewer'),
  '{"agency": ["Meridian Media Group"]}'
);
select public.set_user_role(
  (select id from public.users where email = 'priya.nair@meridianmg.com'),
  (select id from public.roles where name = 'Pricing Lead'),
  '{"client": ["Procter & Gamble"], "brand": ["Pampers", "Gillette"]}'
);
select public.set_user_role(
  (select id from public.users where email = 'hannah.schmidt@harborandvine.com'),
  (select id from public.roles where name = 'Project Manager'),
  '{"client": ["Unilever"], "brand": ["Dove", "Axe"], "campaign_region": ["EMEA"], "campaign_country": ["Germany", "United Kingdom"]}'
);
select public.set_user_role(
  (select id from public.users where email = 'kenji.tanaka@fieldhousestudio.com'),
  (select id from public.roles where name = 'Report Reader'),
  '{"agency_region": ["APAC"], "agency_country": ["Japan"]}'
);
select public.set_user_role(
  (select id from public.users where email = 'marcus.reid@bluepeakdigital.com'),
  (select id from public.roles where name = 'Resource Manager'),
  '{"agency": ["Bluepeak Digital", "Fieldhouse Studio"]}'
);
