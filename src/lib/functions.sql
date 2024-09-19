CREATE FUNCTION api.rewrite_blog(                                                                                            
    param_blog_id INTEGER, 
    param_image TEXT, 
    param_background_image TEXT, 
    param_slug TEXT, 
    param_title TEXT, 
    param_titleseo TEXT, 
    param_descriptionseo TEXT, 
    param_text TEXT, 
    param_puretext TEXT, 
    param_tab VARCHAR(64)
) 
RETURNS SETOF api.blogs AS $$ 
DECLARE
    new_blog_id INTEGER;
BEGIN
    INSERT INTO api.blogs(image, background_image, slug, title, titleseo, descriptionseo, text, puretext, tab, created_by) 
    VALUES (param_image, param_background_image, param_slug, param_title, param_titleseo, param_descriptionseo, param_text, param_puretext, param_tab, get_current_user_id())
    RETURNING blog_id INTO new_blog_id;

    UPDATE api.blogs 
    SET updateattimestamp = CURRENT_TIMESTAMP,
        isdeleted = true,
        created_by = get_current_user_id()
    WHERE blog_id = param_blog_id;

    RETURN QUERY SELECT * FROM api.blogs WHERE blog_id = new_blog_id;
END; $$ 
LANGUAGE plpgsql;

-------------------------------------------------------------------------------------------

CREATE FUNCTION api.delete_blog(                                                                                            
    param_blog_id INTEGER
) 
RETURNS SETOF api.blogs AS $$ 
BEGIN
    UPDATE api.blogs 
    SET updateattimestamp = CURRENT_TIMESTAMP,
        isdeleted = true,
        created_by = get_current_user_id()
    WHERE blog_id = param_blog_id;

    RETURN QUERY SELECT * FROM api.blogs WHERE blog_id = param_blog_id;
END; $$ 
LANGUAGE plpgsql;


-----------------------------------------------------------------------------------------

CREATE or replace FUNCTION api.blog_recovery(                                                                                            
    param_blog_id INTEGER
) 
    RETURNS SETOF api.blogs AS $$ 
    DECLARE
    v_slug TEXT;
    BEGIN
    select slug into v_slug from api.blogs
    where blog_id = param_blog_id;

        UPDATE api.blogs as b
        SET updateattimestamp = CURRENT_TIMESTAMP,
            isdeleted = true
        WHERE updateattimestamp = '9999-12-31 23:59:59'::timestamp without time zone and b.slug = v_slug;

        UPDATE api.blogs 
        SET updateattimestamp = '9999-12-31 23:59:59'::timestamp without time zone,
            isdeleted = false,
            created_by = get_current_user_id()
        WHERE blog_id = param_blog_id;

        RETURN QUERY SELECT * FROM api.blogs WHERE blog_id = param_blog_id;
    END; $$ 
    LANGUAGE plpgsql;

    ----------------------------------------------------------------------------------

create or replace function api.create_new_blog(param_image text, param_background_image text, param_slug text,
 param_title text, param_titleseo text, param_descriptionseo text, param_text text, param_puretext text,
  param_tab varchar(64)) returns setof api.blogs as $$ begin
   return query insert into api.blogs (image, background_image, slug, title, titleseo, descriptionseo,
    text, puretext, tab, created_by, updated_by) values (param_image, param_background_image,
     param_slug, param_title, param_titleseo, param_descriptionseo, param_text, param_puretext,
      param_tab,get_current_user_id(), get_current_user_id()) returning *; end; $$ language plpgsql;

      ----------------------------------------------------------------------------------------

      create view api.get_all_active_blogs as 
      select image, background_image, slug,title,titleseo, descriptionseo,text,puretext,tab,  createat, created_by, blog_id 
       from api.blogs as b
       where b.isdeleted = false and updateattimestamp = '9999-12-31 23:59:59'::timestamp without time zone;

       ---------------------------------------------------------------------------------------------------

      create view api.get_all_blogs as 
      select * from api.blogs;
    


