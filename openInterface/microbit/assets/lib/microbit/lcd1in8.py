#/*****************************************************************************
# | File      	:   lcd1in8.py / from 1in8LCD.ts 
# | Author      :   Léo Meillier (leomlr) (py) / hnwangkg-ezio for Waveshare (ts)
# | Function    :   Contorl 1.8inch lcd Show
# | Info        :
#----------------
# | This version:   V2.0
# | Date        :   2022-06-16 (py) / 2021-01-28 (ts)
# | Info        :   for micro:bit v2
#
#******************************************************************************/
from micropython import const
from microbit import spi, pin1, pin2, pin8, pin12, pin13, pin14, pin15, pin16
import utime

GUI_BACKGROUND_COLOR = const(1)
FONT_BACKGROUND_COLOR = const(1)
FONT_FOREGROUND_COLOR = const(0)

LCD_WIDTH = const(160)  #LCD width
LCD_HEIGHT = const(128) #LCD height

# SRAM opcodes
SRAM_CMD_WREN = const(0x06)
SRAM_CMD_WRDI = const(0x04)
SRAM_CMD_RDSR = const(0x05)
SRAM_CMD_WRSR = const(0x01)
SRAM_CMD_READ = const(0x03)
SRAM_CMD_WRITE = const(0x02)

# SRAM modes
SRAM_BYTE_MODE = const(0x00)
SRAM_PAGE_MODE = const(0x80)
SRAM_STREAM_MODE = const(0x40)

COLOR = {
    'WHITE': 0xFFFF,
    'BLACK': 0x0000,
    'BLUE': 0x001F,
    'BRED': 0xF81F,
    'GRED': 0xFFE0,
    'GBLUE': 0x07FF,
    'RED': 0xF800,
    'MAGENTA': 0xF81F,
    'GREEN': 0x07E0,
    'CYAN': 0x7FFF,
    'YELLOW': 0xFFE0,
    'BROWN': 0xBC40,
    'BRRED': 0xFC07,
    'GRAY': 0x8430
}

DOT_PIXEL = {
    'DOT_PIXEL_1': 1,
    'DOT_PIXEL_2': 2,
    'DOT_PIXEL_3': 3,
    'DOT_PIXEL_4': 4
}

LINE_STYLE = {
    'LINE_SOLID': 0,
    'LINE_DOTTED': 1,
}

DRAW_FILL = {
    'DRAW_EMPTY': 0,
    'DRAW_FULL': 1,
}

class LCD1IN8:
    #% blockId=LCD_Init
    #% blockGap=8
    #% block="LCD1IN8 Init"
    #% weight=200
    def LCD_Init(self):
        pin8.write_digital(1)
        utime.sleep_us(1000)
        pin8.write_digital(0)
        utime.sleep_us(1000)
        pin8.write_digital(1)
        #18000000 (.ts setting from PXT-LCD1IN8)
        #1000000 (micro:bit micropython docs)
        spi.init(baudrate=18000000, bits=8, mode=0, sclk=pin13, mosi=pin15, miso=pin14)

        #ST7735R Frame Rate
        self.LCD_WriteReg(0xB1)
        self.LCD_WriteData_8Bit(0x01)
        self.LCD_WriteData_8Bit(0x2C)
        self.LCD_WriteData_8Bit(0x2D)

        self.LCD_WriteReg(0xB2)
        self.LCD_WriteData_8Bit(0x01)
        self.LCD_WriteData_8Bit(0x2C)
        self.LCD_WriteData_8Bit(0x2D)

        self.LCD_WriteReg(0xB3)
        self.LCD_WriteData_8Bit(0x01)
        self.LCD_WriteData_8Bit(0x2C)
        self.LCD_WriteData_8Bit(0x2D)
        self.LCD_WriteData_8Bit(0x01)
        self.LCD_WriteData_8Bit(0x2C)
        self.LCD_WriteData_8Bit(0x2D)

        self.LCD_WriteReg(0xB4) #Column inversion
        self.LCD_WriteData_8Bit(0x07)

        #ST7735R Power Sequence
        self.LCD_WriteReg(0xC0)
        self.LCD_WriteData_8Bit(0xA2)
        self.LCD_WriteData_8Bit(0x02)
        self.LCD_WriteData_8Bit(0x84)
        self.LCD_WriteReg(0xC1)
        self.LCD_WriteData_8Bit(0xC5)

        self.LCD_WriteReg(0xC2)
        self.LCD_WriteData_8Bit(0x0A)
        self.LCD_WriteData_8Bit(0x00)

        self.LCD_WriteReg(0xC3)
        self.LCD_WriteData_8Bit(0x8A)
        self.LCD_WriteData_8Bit(0x2A)
        self.LCD_WriteReg(0xC4)
        self.LCD_WriteData_8Bit(0x8A)
        self.LCD_WriteData_8Bit(0xEE)

        self.LCD_WriteReg(0xC5) #VCOM
        self.LCD_WriteData_8Bit(0x0E)

        #ST7735R Gamma Sequence
        self.LCD_WriteReg(0xe0)
        self.LCD_WriteData_8Bit(0x0f)
        self.LCD_WriteData_8Bit(0x1a)
        self.LCD_WriteData_8Bit(0x0f)
        self.LCD_WriteData_8Bit(0x18)
        self.LCD_WriteData_8Bit(0x2f)
        self.LCD_WriteData_8Bit(0x28)
        self.LCD_WriteData_8Bit(0x20)
        self.LCD_WriteData_8Bit(0x22)
        self.LCD_WriteData_8Bit(0x1f)
        self.LCD_WriteData_8Bit(0x1b)
        self.LCD_WriteData_8Bit(0x23)
        self.LCD_WriteData_8Bit(0x37)
        self.LCD_WriteData_8Bit(0x00)
        self.LCD_WriteData_8Bit(0x07)
        self.LCD_WriteData_8Bit(0x02)
        self.LCD_WriteData_8Bit(0x10)

        self.LCD_WriteReg(0xe1)
        self.LCD_WriteData_8Bit(0x0f)
        self.LCD_WriteData_8Bit(0x1b)
        self.LCD_WriteData_8Bit(0x0f)
        self.LCD_WriteData_8Bit(0x17)
        self.LCD_WriteData_8Bit(0x33)
        self.LCD_WriteData_8Bit(0x2c)
        self.LCD_WriteData_8Bit(0x29)
        self.LCD_WriteData_8Bit(0x2e)
        self.LCD_WriteData_8Bit(0x30)
        self.LCD_WriteData_8Bit(0x30)
        self.LCD_WriteData_8Bit(0x39)
        self.LCD_WriteData_8Bit(0x3f)
        self.LCD_WriteData_8Bit(0x00)
        self.LCD_WriteData_8Bit(0x07)
        self.LCD_WriteData_8Bit(0x03)
        self.LCD_WriteData_8Bit(0x10)

        self.LCD_WriteReg(0xF0) #Enable test command
        self.LCD_WriteData_8Bit(0x01)

        self.LCD_WriteReg(0xF6) #Disable ram power save mode
        self.LCD_WriteData_8Bit(0x00)

        self.LCD_WriteReg(0x3A) #65k mode
        self.LCD_WriteData_8Bit(0x05)

        self.LCD_WriteReg(0x36) #MX, MY, RGB mode
        self.LCD_WriteData_8Bit(0xF7 & 0xA0) #RGB color filter panel
        
        #sleep out
        self.LCD_WriteReg(0x11)
        utime.sleep_us(1000)

        #self.LCD_WriteReg(0x29)
        self.SPIRAM_Set_Mode(SRAM_BYTE_MODE)
    
    #% blockId=LCD_Clear
    #% blockGap=8
    #% block="LCD Clear"
    #% weight=195
    def LCD_Clear(self):
        self.LCD_SetWindows(0, 0, LCD_WIDTH, LCD_HEIGHT)
        self.LCD_SetColor(0xFFFF, LCD_WIDTH + 2, LCD_HEIGHT + 2)

    #% blockId=LCD_Filling
    #% blockGap=8
    #% block="Filling Color %Color"
    #% weight=195
    def LCD_Filling(self, Color):
        self.LCD_SetWindows(0, 0, LCD_WIDTH, LCD_HEIGHT)
        self.LCD_SetColor(Color, LCD_WIDTH + 2, LCD_HEIGHT + 2)
	
	#% blockId=LCD_SetBL
    #% blockGap=8
    #% block="Set back light level %Lev"
	#% Lev.min=0 Lev.max=1023
    #% weight=180
    def LCD_SetBL(self, Lev):
       pin1.write_analog(Lev)

    def LCD_WriteReg(self, reg):
        pin12.write_digital(0)
        pin16.write_digital(0)
        self.spiWrite(reg)
        pin16.write_digital(1)

    def LCD_WriteData_8Bit(self, Data):
        pin12.write_digital(1)
        pin16.write_digital(0)
        self.spiWrite(Data)
        pin16.write_digital(1)

    def LCD_WriteData_Buf(self, Buf, length):
        pin12.write_digital(1)
        pin16.write_digital(0)
        for i in range(length):
            self.spiWrite((Buf >> 8))
            self.spiWrite((Buf & 0XFF))
        pin16.write_digital(1)

    def LCD_SetWindows(self, Xstart, Ystart, Xend, Yend):
        #set the X coordinates
        self.LCD_WriteReg(0x2A)
        self.LCD_WriteData_8Bit(0x00)
        self.LCD_WriteData_8Bit((Xstart & 0xff) + 1)
        self.LCD_WriteData_8Bit(0x00 )
        self.LCD_WriteData_8Bit(((Xend - 1) & 0xff) + 1)

        #set the Y coordinates
        self.LCD_WriteReg(0x2B)
        self.LCD_WriteData_8Bit(0x00)
        self.LCD_WriteData_8Bit((Ystart & 0xff) + 2)
        self.LCD_WriteData_8Bit(0x00 )
        self.LCD_WriteData_8Bit(((Yend - 1) & 0xff)+ 2)

        self.LCD_WriteReg(0x2C)

    def LCD_SetColor(self, Color, Xpoint, Ypoint, ):
        self.LCD_WriteData_Buf(Color, Xpoint*Ypoint)

    def LCD_SetPoint(self, Xpoint, Ypoint, Color):
        Addr = (Xpoint + Ypoint * LCD_WIDTH)* 2
        self.SPIRAM_WR_Byte(Addr, Color >> 8)
        self.SPIRAM_WR_Byte(Addr + 1, Color & 0xff)
    
    #% blockId=Draw_Clear
    #% blockGap=8
    #% block="Clear Drawing cache"
    #% weight=195
    def LCD_ClearBuf(self):
        self.SPIRAM_Set_Mode(SRAM_STREAM_MODE)
        pin2.write_digital(0)
        self.spiWrite(SRAM_CMD_WRITE)
        self.spiWrite(0)
        self.spiWrite(0)
        self.spiWrite(0)

        for i in range(LCD_WIDTH * 2 * LCD_HEIGHT):
            self.spiWrite(0xff)
        pin2.write_digital(1)
    
    #% blockId=LCD_Display
    #% blockGap=8
    #% block="Show Full Screen"
    #% weight=190
    def LCD_Display(self):
        self.SPIRAM_Set_Mode(SRAM_STREAM_MODE)
        self.LCD_SetWindows(0, 0, LCD_WIDTH, LCD_HEIGHT)
        rbuf = []
        for i in range(640):
            rbuf[i] = 0

        for i in range(64): # read 2line
            pin2.write_digital(0)
            self.spiWrite(SRAM_CMD_READ)
            self.spiWrite(0)
            self.spiWrite((640*i)>>8)
            self.spiWrite((640*i)&0xff)
            for offset in range(640):
                rbuf[offset] = self.spiWrite(0x00)
            pin2.write_digital(1)

            pin12.write_digital(1)
            pin16.write_digital(0)
            for offset in range(640):
                self.spiWrite(rbuf[offset])
            pin16.write_digital(1)   
       
        #Turn on the LCD display
        self.LCD_WriteReg(0x29)
        
    #% blockId=DrawPoint
    #% blockGap=8
    #% block="Draw Point|x %Xpoint|y %Ypoint|Color %Color|Point Size %Dot_Pixel"
    #% Xpoint.min=1 Xpoint.max=160 Ypoint.min=1 Ypoint.max=128
    #% Color.min=0 Color.max=65535
    #% weight=150
    def DrawPoint(self, Xpoint, Ypoint, Color, Dot_Pixel):
        for XDir_Num in range(Dot_Pixel):
            for YDir_Num in range(Dot_Pixel):
                self.LCD_SetPoint(Xpoint + XDir_Num - Dot_Pixel, Ypoint + YDir_Num - Dot_Pixel, Color)

	#% blockId=DrawLine
	#% blockGap=8
	#% block="Draw Line|Xstart %Xstart|Ystart %Ystart|Xend %Xend|Yend %Yend|Color %Color|width %Line_width|Style %Line_Style"
	#% Xstart.min=1 Xstart.max=160 Ystart.min=1 Ystart.max=128
	#% Xend.min=1 Xend.max=160 Yend.min=1 Yend.max=128
	#% Color.min=0 Color.max=65535
	#% weight=140
    def DrawLine(self, Xstart, Ystart, Xend, Yend, Color, Line_width, Line_Style):
        if Xstart > Xend:
            Xstart, Xend = self.Swop_AB(Xstart, Xend)
        if Ystart > Yend:
            Ystart, Yend = self.Swop_AB(Ystart, Yend)

        Xpoint = Xstart
        Ypoint = Ystart
        dx = Xend - Xstart if Xend - Xstart >= 0 else Xstart - Xend
        dy = Yend - Ystart if Yend - Ystart <= 0 else Ystart - Yend

        # Increment direction, 1 is positive, -1 is counter
        XAddway = 1 if Xstart < Xend else -1
        YAddway = 1 if Ystart < Yend else -1

        #Cumulative error
        Esp = dx + dy
        Line_Style_Temp = 0

        while True:
            Line_Style_Temp+=1
            #Painted dotted line, 2 point is really virtual
            if Line_Style == LINE_STYLE['LINE_DOTTED'] and Line_Style_Temp % 3 == 0:
                self.DrawPoint(Xpoint, Ypoint, GUI_BACKGROUND_COLOR, Line_width)
                Line_Style_Temp = 0
            else:
                self.DrawPoint(Xpoint, Ypoint, Color, Line_width)
            if 2 * Esp >= dy:
                if Xpoint == Xend: 
                    break
                Esp += dy
                Xpoint += XAddway
            if 2 * Esp <= dx:
                if Ypoint == Yend:
                    break
                Esp += dx
                Ypoint += YAddway
    
    #% blockId=DrawRectangle
    #% blockGap=8
    #% block="Draw Rectangle|Xstart2 %Xstart2|Ystart2 %Ystart2|Xend2 %Xend2|Yend2 %Yend2|Color %Color|Filled %Filled |Line width %Dot_Pixel"
    #% Xstart2.min=1 Xstart2.max=160 Ystart2.min=1 Ystart2.max=128 
    #% Xend2.min=1 Xend2.max=160 Yend2.min=1 Yend2.max=128
    #% Color.min=0 Color.max=65535
    #% weight=130
    def DrawRectangle(self, Xstart2, Ystart2, Xend2, Yend2, Color, Filled, Dot_Pixel):
        if Xstart2 > Xend2:
            Xstart2, Xend2 = self.Swop_AB(Xstart2, Xend2)
        if Ystart2 > Yend2:
            Ystart2, Yend2 = self.Swop_AB(Ystart2, Yend2)

        Ypoint = 0
        if Filled:
            for Ypoint in range(Ystart2, Yend2):
                self.DrawLine(Xstart2, Ypoint, Xend2, Ypoint, Color, Dot_Pixel, LINE_STYLE['LINE_SOLID'])
        else:
            self.DrawLine(Xstart2, Ystart2, Xend2, Ystart2, Color, Dot_Pixel, LINE_STYLE['LINE_SOLID'])
            self.DrawLine(Xstart2, Ystart2, Xstart2, Yend2, Color, Dot_Pixel, LINE_STYLE['LINE_SOLID'])
            self.DrawLine(Xend2, Yend2, Xend2, Ystart2, Color, Dot_Pixel, LINE_STYLE['LINE_SOLID'])
            self.DrawLine(Xend2, Yend2, Xstart2, Yend2, Color, Dot_Pixel, LINE_STYLE['LINE_SOLID'])

    #% blockId=DrawCircle
    #% blockGap=8
    #% block="Draw Circle|X_Center %X_Center|Y_Center %Y_Center|Radius %Radius|Color %Color|Filled %Draw_Fill|Line width %Dot_Pixel"
	#% X_Center.min=1 X_Center.max=160 Y_Center.min=1 Y_Center.max=128
	#% Radius.min=0 Radius.max=160
    #% Color.min=0 Color.max=65535
    #% weight=120
    def DrawCircle(self, X_Center, Y_Center, Radius, Color, Draw_Fill, Dot_Pixel):
        #Draw a circle from(0, R) as a starting point
        XCurrent = 0
        YCurrent = Radius

        #Cumulative error,judge the next point of the logo
        Esp = 3 - (Radius << 1)

        sCountY = 0
        if Draw_Fill == DRAW_FILL.DRAW_FULL:#DrawPoint(Xpoint, Ypoint, GUI_BACKGROUND_COLOR, Line_width)
            while XCurrent <= YCurrent: #Realistic circles
                for sCountY in range(XCurrent, YCurrent):
                    self.DrawPoint(X_Center + XCurrent, Y_Center + sCountY, Color, DOT_PIXEL['DOT_PIXEL_1'])             #1
                    self.DrawPoint(X_Center - XCurrent, Y_Center + sCountY, Color, DOT_PIXEL['DOT_PIXEL_1'])             #2
                    self.DrawPoint(X_Center - sCountY, Y_Center + XCurrent, Color, DOT_PIXEL['DOT_PIXEL_1'])             #3
                    self.DrawPoint(X_Center - sCountY, Y_Center - XCurrent, Color, DOT_PIXEL['DOT_PIXEL_1'])             #4
                    self.DrawPoint(X_Center - XCurrent, Y_Center - sCountY, Color, DOT_PIXEL['DOT_PIXEL_1'])             #5
                    self.DrawPoint(X_Center + XCurrent, Y_Center - sCountY, Color, DOT_PIXEL['DOT_PIXEL_1'])             #6
                    self.DrawPoint(X_Center + sCountY, Y_Center - XCurrent, Color, DOT_PIXEL['DOT_PIXEL_1'])             #7
                    self.DrawPoint(X_Center + sCountY, Y_Center + XCurrent, Color, DOT_PIXEL['DOT_PIXEL_1'])
                if Esp < 0:
                    Esp += 4 * XCurrent + 6
                else:
                    Esp += 10 + 4 * (XCurrent - YCurrent)
                    YCurrent-=1
                XCurrent+=1
        else: #Draw a hollow circle
            while XCurrent <= YCurrent:
                self.DrawPoint(X_Center + XCurrent, Y_Center + YCurrent, Color, Dot_Pixel)             #1
                self.DrawPoint(X_Center - XCurrent, Y_Center + YCurrent, Color, Dot_Pixel)             #2
                self.DrawPoint(X_Center - YCurrent, Y_Center + XCurrent, Color, Dot_Pixel)             #3
                self.DrawPoint(X_Center - YCurrent, Y_Center - XCurrent, Color, Dot_Pixel)             #4
                self.DrawPoint(X_Center - XCurrent, Y_Center - YCurrent, Color, Dot_Pixel)             #5
                self.DrawPoint(X_Center + XCurrent, Y_Center - YCurrent, Color, Dot_Pixel)             #6
                self.DrawPoint(X_Center + YCurrent, Y_Center - XCurrent, Color, Dot_Pixel)             #7
                self.DrawPoint(X_Center + YCurrent, Y_Center + XCurrent, Color, Dot_Pixel)             #0

                if Esp < 0:
                    Esp += 4 * XCurrent + 6
                else:
                    Esp += 10 + 4 * (XCurrent - YCurrent)
                    YCurrent-=1
                XCurrent+=1
    
    #% blockId=DisString
    #% blockGap=8
    #% block="Show String|X %Xchar|Y %Ychar|char %ch|Color %Color"
    #% Xchar.min=1 Xchar.max=160 Ychar.min=1 Ychar.max=128 
    #% Color.min=0 Color.max=65535
    #% weight=100
    def DisString(self, Xchar, Ychar, ch, Color):
        Xpoint = Xchar
        Ypoint = Ychar
        Font_Height = 12
        Font_Width = 7
        ch_len = len(ch)
        for i in range(ch_len):
            ch_asicc =  ch.charCodeAt(i) - 32 #NULL = 32
            Char_Offset = ch_asicc * 12
            
            if (Xpoint + Font_Width) > LCD_WIDTH:
                Xpoint = Xchar
                Ypoint += Font_Height

            # If the Y direction is full, reposition to(Xstart, Ystart)
            if (Ypoint  + Font_Height) > LCD_HEIGHT:
                Xpoint = Xchar
                Ypoint = Ychar
            self.DisChar_1207(Xpoint, Ypoint, Char_Offset, Color)
            
            #The next word of the abscissa increases the font of the broadband
            Xpoint += Font_Width
    
    #% blockId=DisNumber
    #% blockGap=8
    #% block="Show number|X %Xnum|Y %Ynum|number %num|Color %Color"
    #% Xnum.min=1 Xnum.max=160 Ynum.min=1 Ynum.max=128 
    #% Color.min=0 Color.max=65535
    #% weight=100
    def DisNumber(self, Xnum, Ynum, num, Color):
        Xpoint = Xnum
        Ypoint = Ynum
        self.DisString(Xnum, Ynum, num + "", Color)

    def DisChar_1207(self, Xchar, Ychar, Char_Offset, Color):
        off = Char_Offset
        for Page in range(12):
            for Column in range(7):
                if Font12_Table[off] & (0x80 >> (Column % 8)):
                    self.LCD_SetPoint(Xchar + Column, Ychar + Page, Color)

                #One pixel is 8 bits
                if Column % 8 == 7:
                    off+=1
            # Write a line
            if 7 % 8 != 0:
                off+=1
        # Write all
        
    def spiWrite(self, value):
        spi.write(bytes(value))
        return spi.read(1)

    #spi ram
    def SPIRAM_Set_Mode(self, mode):
        pin2.write_digital(0)
        self.spiWrite(SRAM_CMD_WRSR)
        self.spiWrite(mode)
        pin2.write_digital(1)

    def SPIRAM_RD_Byte(self, Addr):
        pin2.write_digital(0)
        self.spiWrite(SRAM_CMD_READ)
        self.spiWrite(0X00)
        self.spiWrite(Addr >> 8)
        self.spiWrite(Addr)
        RD_Byte = self.spiWrite(0x00)
        pin2.write_digital(1)
        return RD_Byte

    def SPIRAM_WR_Byte(self, Addr, Data):
        pin2.write_digital(0)
        self.spiWrite(SRAM_CMD_WRITE)
        self.spiWrite(0X00)
        self.spiWrite(Addr >> 8)
        self.spiWrite(Addr)        
        self.spiWrite(Data)
        pin2.write_digital(1)

    def Swop_AB(self, Point1, Point2):
        return Point2, Point1
