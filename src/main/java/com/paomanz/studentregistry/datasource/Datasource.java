package com.paomanz.studentregistry.datasource;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Datasource {  // Hikari is the Datasource Springboot recommends to use.

   @Bean
   @ConfigurationProperties("app.datasource")   // "app.datasource" is the reference to .yaml file 'app.' object
   public HikariDataSource hikariDataSource() {
      return DataSourceBuilder
              .create()
              .type(HikariDataSource.class)
              .build();
   }
}
