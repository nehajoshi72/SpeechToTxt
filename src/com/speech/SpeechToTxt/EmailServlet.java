package com.speech.SpeechToTxt;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

/**
 * Servlet implementation class EmailServlet
 */
@WebServlet("/EmailServlet")
public class EmailServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public EmailServlet() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("Inside servlet");
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		// Recipient's email ID needs to be mentioned.
		final String username = "ktrecorder@gmail.com";
		final String password = "Cardinal@1";
	      // Get system properties
	      Properties props = new Properties();
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.host", "smtp.gmail.com");
			props.put("mail.smtp.port", "587");
			
			javax.mail.Session session = javax.mail.Session.getInstance(props, new javax.mail.Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(username, password);
				}
			});
	 
	      // Get the default Session object.
	      
		  // Set response content type
	     // response.setContentType("text/html");
	     // PrintWriter out = response.getWriter();

	      try {
	         // Create a default MimeMessage object.
	         MimeMessage message = new MimeMessage(session);
	        message.setFrom(new InternetAddress("ktrecorder@gmail.com"));
		 message.addRecipients(Message.RecipientType.TO, InternetAddress
						.parse("n.c.joshi@accenture.com"));
		 
		 String timeStamp = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date());
	 
	         // Set Subject: header field
	         message.setSubject("KT Recorder ||" + timeStamp);
	 
	         // Create the message part 
	         BodyPart messageBodyPart = new MimeBodyPart();
	 
	         // Fill the message
	         messageBodyPart.setText(" Hi All,"
	         		+ "\n"
	         		+ "\n"
	         		+ "PFA the Knowledge Transition File for today's session. Happy Learning ! \n \n Thanks & Regards \n \n KT Recorder");
	        
	         
	         // Create a multipar message
	         Multipart multipart = new MimeMultipart();
	 
	         // Set text message part
	         multipart.addBodyPart(messageBodyPart);
	       
            
             System.out.println("Final....");
	        Workbook xlsFile = new HSSFWorkbook(); // create a workbook
	         CreationHelper helper = xlsFile.getCreationHelper();
	         Sheet sheet1 = xlsFile.createSheet("KT Data"); // add a sheet to your workbook
	        // Row row = sheet1.createRow((short)0);
	         
	         String[] columns = {"Topic", "Description", "Receipient", "Presenter","TimeStamp"};
	         
	   
	        	//row.createCell(i).setCellValue(helper.createRichTextString("Topic"));
	        	//i++;
	         
	         
	           // row.createCell(i).setCellValue(helper.createRichTextString(request.getReader().readLine())); // add cells to the row
	      
	            
	            Font headerFont = xlsFile.createFont();
	            headerFont.setFontHeightInPoints((short) 14);
	            //headerFont.setColor(IndexedColors.AUTOMATIC.getIndex());
	            //headerFont.set
	         

	            // Create a CellStyle with the font
	            CellStyle headerCellStyle = xlsFile.createCellStyle();
	            //headerCellStyle.setFont(headerFont);
	            headerCellStyle.setFillForegroundColor(HSSFColor.YELLOW.index);
	            headerCellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

	            // Create a Row
	            Row headerRow = sheet1.createRow(0);
	           

	            // Create cells
	            for(int i = 0; i < columns.length; i++) {
	                Cell cell = headerRow.createCell(i);
	                cell.setCellValue(columns[i]);
	                cell.setCellStyle(headerCellStyle);
	            }
	          
	            
	            for(int j = 0; j < columns.length; j++) {
	                sheet1.autoSizeColumn(j);
	            }
	          
	            //Row row = sheet1.createRow(1);
	            
	            String data = URLDecoder.decode(request.getReader().readLine(),"UTF-8");
	            
	            System.out.println(data);
	            String finalData[] ;
	            finalData = data.split(",");
	             System.out.println(finalData.length);
	           
	            for (int k=0; k <finalData.length ;k++)
	            		{
	            	String topicData[] = new String[5];
	            	Row row = sheet1.createRow(k+1);
	            	String topic[] = finalData[k].split("-");
	            	System.out.println(topic[0]);
	            	topicData[0] = topic[0];
        			String recepients[] = topic[1].split(":");
        			topicData[2] = recepients[0];
        			System.out.println(recepients[0]);
        			String presenter[]  = recepients[1].split(";");
        			topicData[3] = presenter[0];
        			System.out.println(presenter[0]);
        			topicData[1] = presenter[1];
        			System.out.println(presenter[1]);
        			
        			
        			System.out.println(timeStamp);
        			topicData[4] = timeStamp;
        			
        			CellStyle dataCellStyle = xlsFile.createCellStyle();
    	            //headerCellStyle.setFont(headerFont);
        			dataCellStyle.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
        			dataCellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
	            	for(int l=0; l<=4; l++)
	            	{
	            			Cell cell = row.createCell(l);
	    	                cell.setCellValue(helper.createRichTextString(topicData[l]));
	    	                cell.setCellStyle(dataCellStyle);
	    	                sheet1.autoSizeColumn(l);
	            		}
	            		}
	            //URLDecoder.decode(param1AfterEncoding, "UTF-8");
	       // row.createCell(0).setCellValue(helper.createRichTextString(data));
	        
	          //row.createCell(0).setCellValue(request.getReader().readLine());
	       // Write the output to a temporary excel file
	         /* FileOutputStream fos = new FileOutputStream("temp.xls");
	          xlsFile.write(fos);
	          fos.close();

	          // Switch to using a `FileDataSource` (instead of ByteArrayDataSource)
	          DataSource fds = new FileDataSource("temp.xls");*/
	          
	        ByteArrayOutputStream bos = new ByteArrayOutputStream();	
	         xlsFile.write(bos); // write excel data to a byte array
	         bos.close();

	        // String finaldata = URLEncoder.encode(bos.toByteArray().toString(),"UTF-8");
	         
	         // Now use your ByteArrayDataSource as
	        DataSource fds = new ByteArrayDataSource(bos.toByteArray(), "application/vnd.ms-excel");
	      
	        // DataSource fds = new FileDataSource(filename);
	         // Part two is attachment
	         messageBodyPart = new MimeBodyPart();
	        // String filename = "file.txt";
	        // DataSource source = new FileDataSource(filename);
	         messageBodyPart.setDataHandler(new DataHandler(fds));
	        // messageBodyPart.setFileName(filename);
	         multipart.addBodyPart(messageBodyPart);
	 
	         // Send the complete message parts
	         message.setContent(multipart );
	 
	         // Send message
	         Transport.send(message);
	         String title = "Send Email";
	         String res = "Sent message successfully....";
	         String docType =
	         "<!doctype html public \"-//w3c//dtd html 4.0 " + "transitional//en\">\n";
	         
	        /* os.println(docType +
	            "<html>\n" +
	               "<head><title>" + title + "</title></head>\n" +
	               "<body bgcolor = \"#f0f0f0\">\n" +
	                  "<h1 align = \"center\">" + title + "</h1>\n" +
	                  "<p align = \"center\">" + res + "</p>\n" + "</body> </html>"*/
	         //);
	      } catch (MessagingException mex) {
	         mex.printStackTrace();
	      }
	   }
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
